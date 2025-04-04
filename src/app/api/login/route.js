import { ConnectDB } from "@/lib/config/db";
import userModel from "@/lib/model/AuthModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const LoadDB = async () => {
  await ConnectDB();
};

export async function POST(req) {
 
  try {
    const { email, password } = await req.json();
    await LoadDB();
    const existingUser = await userModel.findOne({email});
    if (!existingUser) {
      return NextResponse.json({ message: "User not Exist" },{status:200});
    }
    const checkedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!checkedPassword) {
      return NextResponse.json(
        { message: "Incorrect password" },
        {status:200}
      );
    }
  
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { 
      expiresIn: '1h',
    });

    const cookie = serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    });

 
    return NextResponse.json({ message: "Login successfull", user: {id: existingUser._id, email: existingUser.email } }, { status: 201 , headers: {'Set-Cookie': cookie} });
  }catch (error) {
    console.error("Login error:", error); // Log the error
    return NextResponse.json({ message: "Login failed", error: error.message }, { status: 500 });
    }
}


// app/api/auth/login/route.js (add this to your existing file)
export async function GET(request) {
  try {
    await LoadDB();
    
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});
    
    const token = cookies['authToken'];
    
    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Verify token and get user with email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select('email name');
    
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
  
   
    return NextResponse.json({ 
      user: {
        email: user.email,
        name: user.name
      } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}