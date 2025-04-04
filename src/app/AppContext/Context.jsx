"use client"
import { Posts } from "@/Data/Data";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const PostContext = createContext();

export const useAppContext = () => {
    return useContext(PostContext)
}


export const  PostProvider = (props) => {
    const [post, setPost] = useState([])
    const [isLoggedin, setIsLoggedin] = useState(false);
 

    const fetchPostData = async () => {
        const response = await axios.get('/api/blog')
        setPost(response.data.blogs)
    }
    
//   const getAuthState = async () => {
//     try{
//       const {data} = await axios.get('/api/is-auth')
//       if(data.success){
//         setIsLoggedin(true)
//         getUserData()
//       }
//     }catch(error){
//       toast.error(error.message )
//     }
// }
    const reversedPosts = [...post].reverse();
    useEffect(() => {
        fetchPostData()
    }, [])

    // const getAuthState = async () => {
    //     try{
    //       const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
    //       if(data.success){
    //         setIsLoggedin(true)
    //         getUserData()
    //       }
    //     }catch(error){
    //       toast.error(error.message )
    //     }
    // }
    // useEffect(()=>{
    //     getAuthState();
    //   },[])
  

    
    

return(
    <PostContext.Provider value={{
      // getAuthState,
      // isLoggedin,
      // setIsLoggedin,
        reversedPosts,
        Posts,
        post,setPost,
        fetchPostData,
    
    }}>
        {props.children}
    </PostContext.Provider>
    )
} 

