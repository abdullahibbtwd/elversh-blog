"use client";

import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { format, parse } from 'date-fns';

const PostCard = ({ post}) => {

    const formatPostDate = (dateString) => {
          try {
              const parsedDate = parse(dateString, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", new Date());
              return format(parsedDate, 'MMMM dd, yyyy');
          } catch (error) {
              console.error('Error formatting date:', error);
              return 'Date not available';
          }
      };
  

  const router = useRouter();
 
  return (
    <div
      onClick={() => {
        router.push("/post/" + post._id);
        scrollTo(0, 0);
      }}
    >
      <div
        className="flex flex-col lg:flex-row w-full justify-between gap-4 p-2 bg-gray-100 rounded-md"
        key={post.id}
      >
        {/* Text container */}
        <div className="lg:w-2/3 w-full flex flex-col gap-2 p-4">
          <h1 className="text-xl font-semibold ">{post.title}</h1>
          <div className="w-full ">
            <pre
              className="text-x pre"
              dangerouslySetInnerHTML={{
                __html: post.description.slice(0, 120),
              }}
            ></pre>
          </div>

          <button className="text-sm font-semibold cursor-pointer bg-blue-700 text-white w-max px-2 py-1 rounded-md">
            Read More
          </button>
          <p className="text-gray-400 text-xs">Date: {formatPostDate(post.date)}</p> 
        </div>
        {/* Image Container */}
        <Suspense fallback={<FaSpinner />}>
          <div className="lg:w-1/3 w-full p-2 flex items-center justify-center">
            <img
              src={post.image}
              className="object-cover w-[240px] h-[120px] rounded-md"
              alt=""
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default PostCard;
