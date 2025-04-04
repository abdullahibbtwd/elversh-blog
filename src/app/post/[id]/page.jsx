"use client";

import { useAppContext } from "@/app/AppContext/Context";
import PostCard from "@/app/Components/PostCard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";

const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

function Text({ content }) {
  const words = content.split(" ");
  return (
    <pre className="pre">
      {words.map((word, index) => {
        return word.match(URL_REGEX) ? (
          <a key={index} className="text-blue-900" href={word}>
            {word}
          </a>
        ) : (
          word + " "
        );
      })}
    </pre>
  );
}

const page = () => {
  const { id } = useParams("");

  const { post } = useAppContext();

  const [postData, setPostData] = useState(null);

  const fetchPostData = async () => {
    const foundPost = post.find((item) => item._id === id);
    setPostData(foundPost);
  };

  useEffect(() => {
    fetchPostData();
  }, [id, post.length]);

  const formatPostDate = (dateString) => {
    try {
      const parsedDate = parse(
        dateString,
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
        new Date()
      );
      return format(parsedDate, "MMMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  };

  return postData ? (
    <>
      <div className="w-full  lg:p-7 p-2 flex flex-col gap-4">
        {/* Image Container */}
        <div className="flex items-center justify-center w-full h-[200px] ">
          <img
            src={postData.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/*Text Container  */}
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-2xl font-semibold ">{postData.title}</h1>
          <Text content={postData.description} className="text-xl" />
          <p className="text-xs font-semibold tracking-wide text-gray-800">{formatPostDate(postData.date)}</p>
        </div>
        <h1 className="text-xl italic mt-4">Others</h1>
        <div className="flex flex-col gap-3 lg:justify-between ">
          {post.map((p, index) => (
            <PostCard key={index} post={p} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default page;
