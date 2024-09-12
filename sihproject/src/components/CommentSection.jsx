import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentFeatures from "./CommentFeatures";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CommentToolbar from "./CommentToolbar";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [showFullComment, setShowFullComment] = useState(false);

  const toggleShowFullComment = () => {
    setShowFullComment(!showFullComment);
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comments/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!currentUser) return; // Prevent action if not logged in
    try {
      const res = await fetch(`/api/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          email: currentUser.email || "noemail",
          name: currentUser.name || "Anonymous",
          profilePicture: currentUser.profilePicture || "",
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await res.json();
      setComments([data, ...comments]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!currentUser) return; // Prevent action if not logged in
    try {
      const res = await fetch(`/api/comments/deleteComments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser.email,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete comment");
      }
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!currentUser) return; // Prevent action if not logged in
    try {
      const res = await fetch(`/api/comments/likeComment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser.email,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to like comment");
      }
      const data = await res.json();
      setComments(comments.map((c) => (c._id === data._id ? data : c)));
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 mt-2 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-bold ">Comments</h3>
      {currentUser ? (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <img
              src={currentUser.profilePicture}
              alt="profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <Link to="/profile" className="font-semibold text-blue-400">
              @{currentUser.name}
            </Link>
          </div>
          <form onSubmit={handleAddComment} className="flex flex-col space-y-2">
            <CommentToolbar />
            <ReactQuill
              theme="snow"
              value={comment}
              onChange={setComment}
              placeholder="Write a comment..."
              className="bg-gray-600 text-white rounded-lg p-2"
              modules={{
                toolbar: {
                  container: "#toolbar",
                },
              }}
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white py-1 px-3 rounded-lg"
              type="submit"
              aria-label="Add Comment"
            >
              Add Comment
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mb-4">
          Login to comment.{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-400">
          No Comments, be the first one to comment.
        </p>
      ) : (
        <ul className="space-y-4 text-sm">
          {comments.map((comment) => (
            <li key={comment._id} className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src={comment.profilePicture || ""}
                  alt="profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-semibold">@{comment.name}</span>
              </div>
              <div
                className={`prose prose-invert text-sm text-white ${
                  showFullComment ? "" : "line-clamp-4"
                }`}
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
              <button
                className="text-blue-400 hover:underline"
                onClick={toggleShowFullComment}
              >
                {showFullComment ? "Show Less" : "Show More"}
              </button>

              <div className="flex items-center space-x-2 text-gray-400">
                <span>{comment.numberOfLikes} Likes</span>
                {currentUser && comment.likes.includes(currentUser.email) && (
                  <span>You liked this</span>
                )}
              </div>
              <span className="text-sm text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
              <CommentFeatures
                comment={comment}
                currentUser={currentUser}
                onLike={handleLikeComment}
                onDelete={handleDeleteComment}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentSection;
