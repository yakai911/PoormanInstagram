import React from "react";
import Post from "./Post";
import InstagramEmbed from "react-instagram-embed";

const Posts = ({ posts, user }) => {
  return (
    <div className="app__posts">
      <div className="app__postsLeft">
        {posts.map(({ id, post }) => {
          return (
            <Post
              user={user}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              key={id}
              postId={id}
            />
          );
        })}
      </div>
      <div className="app__postsRight">
        <InstagramEmbed
          url="https://www.instagram.com/p/CFIEY7GpqxG/"
          maxWidth={320}
          hideCaption={false}
          containerTagName="div"
          protocol=""
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div>
    </div>
  );
};

export default Posts;
