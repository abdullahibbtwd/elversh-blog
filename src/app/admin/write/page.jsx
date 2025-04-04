"use client"
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import FroalaEditor from "react-froala-wysiwyg"
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";



const page = () => {
  const [values, setValues] = useState({
    title:"",
    description:"",
    category:"Opportunity",
  });
  const [image ,setImage] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues(values=>({...values,[name]:value}))
  }

  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const handleInput = () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      };

      textarea.addEventListener('input', handleInput);

      //initial resize.
      handleInput();

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }
  }, []);


    const onSubmit = async (e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('title',values.title);
      formData.append('description',values.description);
      formData.append('category',values.category);
      formData.append('image',image);
      const response = await axios.post('/api/blog',formData);
      if (response.data.success){
        toast.success(response.data.msg);
        setImage(false);
        setValues({
          title:"",
          description:"",
          category:"Opportunity",
        })
        
      }
      else{
        toast.error("Error")
      }
    }


  return (
    <div className="mt-[20px] flex-col w-full lg:flex-row flex gap-5 px-2 lg:px-10" >
       <form className="lg:flex-row flex flex-col gap-5 w-full" onSubmit={onSubmit}>
      <div className="flex-4 flex flex-col gap-5 ">
        <input type="text" name="title" onChange={onChangeHandler} value={values.title}  className="p-4 border-gray-300 rounded-md  border-2 outline-none" placeholder="Title" />
        <div className="flex flex-col gap-3">
          {/* <FroalaEditor
          model={values.description}
          onModelChange={onChangeHandler}
          className="h-full border-none mb-3"
          />   */}
          <textarea name="description" onChange={onChangeHandler} value={values.description}    ref={textareaRef} placeholder="Blog Content" className=" w-full h-36 border p-2 resize-both whitespace-pre-wrap break-words overflow-wrap-break-word rounded-md  border-gray-300 "/>
            <div className="border-2 w-full border-gray-300 p-5 gap-2 flex flex-col justify-center items-center text-[14px] text-gray-700">
          <input onChange={(e)=>setImage(e.target.files[0])} style={{ display: "none" }} type="file" name="" id="file" />
          <label className="underline cursor-pointer w-full text-5xl text-center"  htmlFor="file">
         <img src={!image?"/upload.png":URL.createObjectURL(image)} width={140} height={140}  className="object-cover" alt="" />
          </label>
           
        </div>
         <select name="category" className="p-3 bg-blue-300" onChange={onChangeHandler} value={values.category} >
              <option value="Opportunity">Opportunity</option>
              <option value="Politics">Politics</option>
              <option value="Sport">Sport</option>
            </select>
           <button className="p-3 cursor-pointer bg-blue-700 text-white w-max rounded-md">ADD</button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default page
