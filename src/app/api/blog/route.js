import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/model/BloogModel";
const { NextResponse } = require("next/server");
import { writeFile } from "fs/promises";
//const fs = require("fs");

import fs from 'fs/promises'; // Use fs.promises for async file operations

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

//Api for get blog
export async function GET(req) {
  const blogId = req.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({
      blogs,
    });
  }
}

//Api End Point for uploading blogs
export async function POST(req) {
  const formData = await req.formData();

  const timestamp = Date.now();
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);

  const imageUrl = `/${timestamp}_${image.name}`;
  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    image: `${imageUrl}`,
  };
  await BlogModel.create(blogData);

  return NextResponse.json({ success: true, msg: "Blog Added" });
}
//Api for delete

export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Deleted"})
}

