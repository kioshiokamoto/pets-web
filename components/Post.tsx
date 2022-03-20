import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: number;
  name: string;
  user: {
    name: string;
    email: string;
  } | null;
  breed: string;
  birthDate: any;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.user ? post.user.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.name}</h2>
      <small>De {authorName}</small>
      <ReactMarkdown children={post.breed} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
