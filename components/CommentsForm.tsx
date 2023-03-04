import React, { useState, useEffect, useRef, FC } from "react";
import { submitComment } from "../services";
import { CommentsFormProps } from "../types/interfaces";

const CommentsForm:FC<CommentsFormProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(nameEl.current) {
      nameEl.current.value = window.localStorage.getItem("name") || "";
    }
    if(emailEl.current) {
      emailEl.current.value = window.localStorage.getItem("email") || "";
    }
  }, []);

  const handleCommentSubmission = () => {
    setError(false);


    const { value: comment } = commentEl.current!;
    const { value: name } = nameEl.current!;
    const { value: email } = emailEl.current!;
    const { checked: storeData } = storeDataEl.current!;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setshowSuccessMessage(true);
      setTimeout(() => {
        setshowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 border border-white dark:bg-neutral-900">
      <h3 className="text-lg mb-8 font-semibold border-b pb-4">
        Leave a Reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 dark:placeholder:text-gray-700"
          placeholder="Comment"
          name="comment"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 dark:placeholder:text-gray-700"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 dark:placeholder:text-gray-700"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            defaultChecked={true}
          />
          <label
            className="text-gray-500 cursor-pointer ml-2 dark:text-white"
            htmlFor="storeData"
          >
            Save my e-mail and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8 ">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right mt-3 font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
}


export default CommentsForm