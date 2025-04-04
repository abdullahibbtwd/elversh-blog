"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "@/app/AppContext/Context";

const Page = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All field are necessary");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      if (response.success) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        toast.error(response.data.error);
        router.push("/auth/login")
      }
    } catch {
      toast.error("Error");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-[88vh] bg-slate-200">
      <h1 className="text-[20px] text-blue-700 mb-[20px]">Login</h1>
      <form
        onSubmit={SubmitHandler}
        className="flex flex-col p-[50px]  bg-white w-3/4 lg:w-[400px] gap-[25px] rounded-md"
      >
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2  border-b-2 outline-none border-gray-300"
          placeholder="Username"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2  border-b-2 outline-none border-gray-300"
          placeholder="email"
        />
        <input
          required
          type="password"
          className="p-2  border-b-2 outline-none border-gray-300"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-3 border-none bg-blue-700 text-white cursor-pointer rounded-2xl">
          Login
        </button>
        {error && <p className="text-red">{error}</p>}
      </form>
    </div>
  );
};

export default Page;
