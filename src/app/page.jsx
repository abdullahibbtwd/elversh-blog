import React from "react";
import Post from "./Components/Post";
import Subscribe from "./Components/Subscribe";

const page = () => {
  return (
    <div className="lg:p-8 px-2 flex flex-col gap-4 w-full">
      <Post />
      <Subscribe />
    </div>
  );
};

export default page;
