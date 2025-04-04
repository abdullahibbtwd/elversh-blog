"use client"
import { useAppContext } from "@/app/AppContext/Context";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { useSession } from "@/app/hook/session";



const page = () => {
  const { user, isSpecificUser, loading } = useSession();

 const { post,fetchPostData } = useAppContext()

 const router = useRouter();

  return (
    <div className="p-10 w-full">
      <div className="flex flex-col  p-3 w-full border-2 border-gray-300 ">
        {post.map((p,index) => (
            <div key={index} className="flex items-center border-b border-gray-300 gap-2 flex-col lg:flex-row p-1 justify-between">
          <h2 className="lg:w-2/5 w-full">{p.title}</h2>
            <div className="w-full lg:w-2/5 text-[6px] lg:text-xs h-12 overflow-hidden">
              <p className="w-full lg:w-2/5 text-[6px] lg:text-xs">
          {p.description}

          </p>
            </div>
          
          <div className="w-full lg:w-1/5 flex items-center justify-center">
           <img src="/gym (4).jpg" className="w-9 h-9 " alt="" />
          </div>
         

          <div className="flex items-center gap-2 w-full lg:w-1/5 text-3xl">
            <MdDelete onClick={()=> deleteBlog(p._id)} className="text-red-900"/>
          </div>
        </div>
        )  )}
      
      </div>
    </div>
  );
};

export default page;
