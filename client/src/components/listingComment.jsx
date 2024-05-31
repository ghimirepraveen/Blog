import React from "react";

const CommentsList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <div>No comments yet.</div>;
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded mb-2">
          {comment.author && comment.author.name && (
            <p className="text-xs text-gray-500">{comment.author.name}</p>
          )}
          <p> {comment.content}</p>
          <p className="text-xs text-gray-500">
            Commented on:
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
