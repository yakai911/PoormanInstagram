import React, { useState, useEffect } from "react";
import "./Post.css";
import { db, storage } from "./firebase";
import { Avatar } from "@material-ui/core/";

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {};

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="hapmoniym" src="./avatar1.png" />

        <h3>{username}</h3>
      </div>

      <img src={imageUrl} alt="" className="post__image" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <storage>{comment.username}</storage> {comment.text}
          </p>
        ))}
      </div>

      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="添加评论..."
          value={comment}
          onChange={(e) => setComments(e.target.value)}
        />
        <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          发布
        </button>
      </form>
    </div>
  );
}

export default Post;
