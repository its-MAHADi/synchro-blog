import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ... (Existing POST function remains here) ...

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions); // 1️⃣ Authentication check

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    } // 2️⃣ Parse request body

    const body = await req.json();
    const {
      id,
      post_id,
      post_author_email,
      text,
      comment_author_name,
      comment_author_email,
      comment_author_image,
      created_at,
    } = body; // 3️⃣ Validate data

    if (!post_id || !text || !comment_author_name || !comment_author_email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    } // 4️⃣ Get DB collections

    const commentCollection = dbConnect(collectionNameObj.commentCollection);
    const blogCollection = dbConnect(collectionNameObj.blogCollection); // 5️⃣ Construct full comment object (same as frontend)

    const newComment = {
      id, // This field should ideally be removed and let MongoDB generate _id, or ensure 'id' is a unique string.
      post_id: new ObjectId(post_id), // keep reference as ObjectId
      post_author_email,
      text,
      comment_author_name,
      comment_author_email,
      comment_author_image,
      created_at: created_at || new Date().toISOString(), // Use provided date or current date
    }; // 6️⃣ Insert into database // Note: If 'id' is not the MongoDB '_id', you should remove it or use it as a custom key.

    const result = await commentCollection.insertOne(newComment);
    const savedComment = { ...newComment, _id: result.insertedId }; // 7️⃣ Increment comment count in the blog document

    await blogCollection.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { comment: 1 } }
    ); // 8️⃣ Response

    return NextResponse.json({
      success: true,
      message: "Comment added successfully",
      data: savedComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------------
// ⭐ NEW PATCH FUNCTIONALITY (UPDATE) ⭐
// ------------------------------------------------------------------

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions); // 1️⃣ Authentication check

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const currentUserEmail = session.user.email;
    const body = await req.json();
    const { commentId, newText } = body; // 2️⃣ Validate required data

    if (!commentId || !newText || newText.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (commentId or newText)",
        },
        { status: 400 }
      );
    } // 3️⃣ Get DB collection

    const commentCollection = dbConnect(collectionNameObj.commentCollection); // 4️⃣ Find the comment and check authorization

    let commentToUpdate;
    try {
      commentToUpdate = await commentCollection.findOne({
        _id: new ObjectId(commentId),
      });
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid comment ID format" },
        { status: 400 }
      );
    }

    if (!commentToUpdate) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    } // Authorization check: Only the original comment author can update it

    if (currentUserEmail !== commentToUpdate.comment_author_email) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update this comment",
        },
        { status: 403 } // Forbidden
      );
    } // 5️⃣ Update the comment text and add an 'updated_at' timestamp

    const updateResult = await commentCollection.updateOne(
      { _id: new ObjectId(commentId) },
      {
        $set: {
          text: newText.trim(),
          updated_at: new Date().toISOString(),
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      // This could mean the text was the same, or no document was updated
      return NextResponse.json(
        { success: true, message: "Comment updated, but no change detected" },
        { status: 200 }
      );
    } // 6️⃣ Response

    return NextResponse.json({
      success: true,
      message: "Comment updated successfully",
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------------
// ⭐ EXISTING DELETE FUNCTIONALITY ⭐
// ------------------------------------------------------------------

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions); // 1️⃣ Authentication check

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    } // The currently authenticated user's email

    const currentUserEmail = session.user.email; // 2️⃣ Get the comment_id from the URL query parameters

    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");
    const postId = searchParams.get("postId"); // Get post ID to decrement count

    if (!commentId || !postId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required query parameters (commentId or postId)",
        },
        { status: 400 }
      );
    } // 3️⃣ Get DB collections

    const commentCollection = dbConnect(collectionNameObj.commentCollection);
    const blogCollection = dbConnect(collectionNameObj.blogCollection); // 4️⃣ Find the comment and check authorization

    let commentToDelete;
    try {
      commentToDelete = await commentCollection.findOne({
        _id: new ObjectId(commentId),
      });
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid comment ID format" },
        { status: 400 }
      );
    }
    if (!commentToDelete) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    const isCommentAuthor =
      currentUserEmail === commentToDelete.comment_author_email;
    const isPostAuthor = currentUserEmail === commentToDelete.post_author_email; // Authorization check
    if (!isCommentAuthor && !isPostAuthor) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this comment",
        },
        { status: 403 } // Forbidden
      );
    } // 5️⃣ Delete the comment

    const deleteResult = await commentCollection.deleteOne({
      _id: new ObjectId(commentId),
    });

    if (deleteResult.deletedCount === 0) {
      // This is a safety check, though unlikely to be hit after the findOne check
      return NextResponse.json(
        { success: false, message: "Comment not deleted (database issue)" },
        { status: 500 }
      );
    } // 6️⃣ Decrement comment count in the blog document

    await blogCollection.updateOne(
      { _id: new ObjectId(postId) },
      { $inc: { comment: -1 } }
    ); // 7️⃣ Response

    return NextResponse.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
