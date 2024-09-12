import React from "react";

const CommentToolbar = () => (
  <div
    id="toolbar"
    style={{
      backgroundColor: "#d6d0d0",
      border: "1px solid #374151",
      borderRadius: "0.5rem",
    }}
  >
    <button
      style={{ color: "white" }}
      className="ql-bold"
      title="Bold"
      aria-label="Bold"
    >
      B
    </button>
    <button
      style={{ color: "white" }}
      className="ql-italic"
      title="Italic"
      aria-label="italic"
    >
      I
    </button>
    <button
      style={{ color: "white" }}
      className="ql-underline"
      title="Underline"
      aria-label="underline"
    >
      U
    </button>
    <button
      style={{ color: "white" }}
      className="ql-strike"
      title="Strike"
      aria-label="strike"
    >
      S
    </button>
    <button
      style={{ color: "white" }}
      className="ql-list"
      title="Ordered List"
      aria-label="ordered list"
    >
      OL
    </button>

    <button className="ql-link" title="Link" aria-label="link">
      Link
    </button>
  </div>
);

export default CommentToolbar;
