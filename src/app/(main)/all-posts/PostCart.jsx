import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const PostCart = ({ postData }) => {
    // Description handle
    const text = postData?.description || "";
    const maxLength = 140;
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + " ..." : text;

    // Title handle
    const titleText = postData?.title || "Untitled Post";
    const tileMaxLength = 60;
    const titleTruncated = titleText.length > tileMaxLength ? titleText.slice(0, tileMaxLength) + " ..." : titleText;

    // Fallbacks for other fields
    const image = postData?.image || "/default-cover.jpg";  
    const authorImage = postData?.author_image || "/default-author.png";
    const authorName = postData?.author_name || "Unknown Author";
    const publishDate = postData?.publish_date || "Unknown Date";
    const id = postData?._id?.toString() || "#";  // MongoDB ObjectId safe

    return (
        <div className="max-w-sm mx-auto bg-[#f6f5ea] rounded-lg overflow-hidden shadow flex flex-col h-full">
            {/* Image */}
            <div className="relative">
                <img
                    className="w-full h-60 object-cover"
                    src={image}
                    alt="Blog Cover"
                />
                {/* Overlay */}
                <div className="absolute bottom-0 w-full text-white p-4 flex items-center justify-between bg-black/40 backdrop-blur-md">
                    <div className="flex items-center space-x-2">
                        <img
                            className="w-8 md:w-10 h-8 md:h-10 rounded-full"
                            src={authorImage}
                            alt="Author"
                        />
                        <div>
                            <p className="text-sm md:text-base font-semibold">{authorName}</p>
                            <p className="text-xs text-gray-200">{publishDate}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-bold mb-2">{titleTruncated}</h3>
                    <p className="text-gray-600 text-sm mb-4">{truncated}</p>
                </div>

                <div>
                    <Link
                        href={`/all-posts/${id}`}
                        className="flex items-center gap-1 font-medium text-[#c45627] text-lg hover:underline"
                    >
                        View Post <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostCart;