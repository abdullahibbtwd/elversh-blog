"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wait,setWaiting] = useState(true)
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await axios.post("/api/login", { email, password });
    if (response.status === 201) {
    toast.success(response.data.message);
    router.push("/")
   
    } else{
      toast.error(response.data.message)
    }
   }catch(error){
    toast.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-[88vh] bg-slate-200">
      <h1 className="text-[20px] text-blue-700 mb-[20px]">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-[50px]  bg-white w-3/4 lg:w-[400px] gap-[25px] rounded-md"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2  border-b-2 outline-none border-gray-300"
          placeholder="email"
        />
        <input
          type="password"
          className="p-2  border-b-2 outline-none border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="p-3 border-none bg-blue-700 text-white cursor-pointer rounded-2xl">
         Login
        </button>
        {/* <p>invalid login credential</p> */}
      </form>
    </div>
  );
};

export default page;
