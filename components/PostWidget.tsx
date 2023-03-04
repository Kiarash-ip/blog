import React, { useState, useEffect, FC } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import { PostWidgetProp, Post } from "../types/interfaces";

const PostWidget: FC<PostWidgetProp> = ({ categories, slug }) =>  {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 dark:bg-neutral-900 border border-white">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 text-gray-700 dark:text-white">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-[60px] h-[60px] flex justify-center items-center">
            <img
              src={post.featuredImage.url}
              width={60}
              height={60}
              alt={post.title}
              className="w-[60px] h-[60px] object-contain rounded-full overflow-hidden"
            />
          </div>
          <div className="grow ml-4 flex flex-col">
            <p className="text-gray-500 font-xs dark:text-white">
              {moment(post.createdAt).format("MMM, DD, YYYY")}
            </p>
            <Link
              href={`/post/${post.slug}`}
              className="text-md text-gray-700 dark:text-white"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}


export default PostWidget