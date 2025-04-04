import { ConnectDB } from "@/lib/config/db";
import userModel from "@/lib/model/AuthModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const LoadDB = async () => {
  await ConnectDB();
};

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    LoadDB();

    const existingUser = await userModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (existingUser) {
      return NextResponse.json({ error: "Email Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({ name, email, password: hashedPassword });
    return NextResponse.json({ message: "user registered" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "not registerd" }, { status: 500 });
  }
}
