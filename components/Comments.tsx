import React, { useState, useEffect, FC } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";
import { CommentsProps } from "../types/interfaces";


interface Comment {
  name: string;
  createdAt: string;
  comment: string;
}

const Comments:FC<CommentsProps> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 border border-white dark:bg-neutral-900">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-gray-100 mb-4 pb-4 dark:text-white"
            >
              <p className="mb-4 ">
                <span className="font-semibold">{comment.name}</span> on{" "}
                {moment(comment.createdAt).format("MM, DD, YYYY")}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full dark:text-white">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}


export default Comments