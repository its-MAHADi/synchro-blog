// src/app/api/comments/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// ------------------------
// POST: Add new comment
// ------------------------
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      post_id,
      post_author_email,
      text,
      comment_author_name,
      comment_author_email,
      comment_author_image,
      created_at,
    } = body;

    if (!post_id || !text || !comment_author_name || !comment_author_email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Await DB collections
    const commentCollection = await dbConnect(
      collectionNameObj.commentCollection
    );
    const blogCollection = await dbConnect(collectionNameObj.blogCollection);

    const newComment = {
      post_id: new ObjectId(post_id),
      post_author_email,
      text,
      comment_author_name,
      comment_author_email,
      comment_author_image,
      created_at: created_at || new Date().toISOString(),
    };

    const result = await commentCollection.insertOne(newComment);
    const savedComment = { ...newComment, _id: result.insertedId };

    // Increment comment count on the blog
    await blogCollection.updateOne(
      { _id: new ObjectId(post_id) },
      { $inc: { comment: 1 } }
    );

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

// ------------------------
// PATCH: Update a comment
// ------------------------
export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const currentUserEmail = session.user.email;
    const body = await req.json();
    const { commentId, newText } = body;

    if (!commentId || !newText || newText.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields (commentId or newText)",
        },
        { status: 400 }
      );
    }

    const commentCollection = await dbConnect(
      collectionNameObj.commentCollection
    );

    // Find the comment
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
    }

    // Authorization check
    if (currentUserEmail !== commentToUpdate.comment_author_email) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to update this comment",
        },
        { status: 403 }
      );
    }

    const updateResult = await commentCollection.updateOne(
      { _id: new ObjectId(commentId) },
      { $set: { text: newText.trim(), updated_at: new Date().toISOString() } }
    );

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

// ------------------------
// DELETE: Delete a comment
// ------------------------
export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const currentUserEmail = session.user.email;
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");
    const postId = searchParams.get("postId");

    if (!commentId || !postId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required query parameters (commentId or postId)",
        },
        { status: 400 }
      );
    }

    const commentCollection = await dbConnect(
      collectionNameObj.commentCollection
    );
    const blogCollection = await dbConnect(collectionNameObj.blogCollection);

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
    const isPostAuthor = currentUserEmail === commentToDelete.post_author_email;

    if (!isCommentAuthor && !isPostAuthor) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized to delete this comment",
        },
        { status: 403 }
      );
    }

    const deleteResult = await commentCollection.deleteOne({
      _id: new ObjectId(commentId),
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Comment not deleted (database issue)" },
        { status: 500 }
      );
    }

    await blogCollection.updateOne(
      { _id: new ObjectId(postId) },
      { $inc: { comment: -1 } }
    );

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
