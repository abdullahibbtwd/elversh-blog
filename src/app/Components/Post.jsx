"use client"
import React, { useContext } from 'react'
import {  useAppContext } from '../AppContext/Context'
import PostCard from './PostCard';
const Post = () => {
    const { reversedPosts } =useAppContext();

    if (!reversedPosts) {
      return <p>Loading info...</p>;
    }

  return (
    <div className='lg:p-5 flex w-full flex-col gap-3'>
      
        {
            reversedPosts.map((posts,index)=> <PostCard  key={posts._id} id={posts._id}  post={posts}/>)
        }
    </div>
  )
}

export default Post
