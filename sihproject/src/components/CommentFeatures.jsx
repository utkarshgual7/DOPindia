import React from "react";
import { ThumbUpIcon as ThumbUpIconOutline } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/solid"; // Import the filled icon
import { TrashIcon, ReplyIcon } from "@heroicons/react/outline";

const CommentFeatures = ({ comment, currentUser, onLike, onDelete }) => {
  const isLikedByCurrentUser = currentUser
    ? comment.likes.includes(currentUser.email)
    : false;

  return (
    <div className="flex items-center space-x-4 mt-2">
      <button
        className={`flex items-center ${
          isLikedByCurrentUser ? "text-blue-500" : "text-blue-400"
        } hover:text-blue-300`}
        onClick={() => onLike(comment._id)}
        aria-label="Like Button"
      >
        {isLikedByCurrentUser ? (
          <ThumbUpIconSolid className="h-5 w-5 mr-1" />
        ) : (
          <ThumbUpIconOutline className="h-5 w-5 mr-1" />
        )}
        <p className="text-gray-400 ml-1">
          {comment.numberOfLikes > 0 &&
            `${comment.numberOfLikes} ${
              comment.numberOfLikes === 1 ? "like" : "likes"
            }`}
        </p>
      </button>
      {currentUser && currentUser.email === comment.email && (
        <button
          className="text-red-400 hover:text-red-300"
          onClick={() => onDelete(comment._id)}
          aria-label="Delete comment button"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default CommentFeatures;
