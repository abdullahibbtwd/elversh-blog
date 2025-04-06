import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/model/BloogModel";
const { NextResponse } = require("next/server");
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

import fs from "fs/promises";

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

  const images = formData.get("image");
  const filesArray = Array.isArray(images) ? images : [images];
  const imageUrls = await Promise.all(
    filesArray.map(async (image) => {
      const buffer = await image.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${image.type};base64,${base64Image}`;

      const result = await cloudinary.v2.uploader.upload(dataURI, {
        folder: "blog",
      });
      return result.secure_url;
    })
  );
  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    image: `${imageUrls}`,
  };
  await BlogModel.create(blogData);

  return NextResponse.json({ success: true, msg: "Blog Added" });
}
//Api for delete

export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Deleted" });
}
