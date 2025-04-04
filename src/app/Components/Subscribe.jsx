"use client"
import axios from "axios";
import react, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";


const Subscribe = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e)=>{
      e.preventDefault()
      const formData  =new FormData();

      formData.append("email",email)
      const resp = await axios.post('/api/email',formData)
      if(resp.data.success){
        toast.success(resp.data.msg)
        setEmail("")
      }else{
        toast.error("Error!!!!!")
      }
  }

  return (
    <div className="py-4 px-7 flex flex-col gap-3 items-center justify-center bg-blue-100">
      <h1 className="text-2xl font-bold">Subscribe</h1>

      <form onSubmit={onSubmitHandler} className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full lg:w-3/4 bg-white h-max rounded-4xl">
          <input
            type="email"
            placeholder="ab@bs.com"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            className="px-4 py-3 bg-transparent outline-none w-full h-12"
          />
        </div>

        <button className="text-sm font-semibold cursor-pointer bg-blue-700 text-white w-max px-2 py-1 rounded-md">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
