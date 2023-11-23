import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("All fields are required", {
        status: 400,
      });
    }

    const existingProfile = await db.profile.findUnique({
      where: {
        email,
      },
    });

    if (existingProfile) {
      return new NextResponse("Email or username is currently in use", {
        status: 400,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const profile = await db.profile.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json({ profile });
  } catch (e) {
    console.error(e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
