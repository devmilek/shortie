import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(
  req: NextRequest,
  { params }: { params: { linkId: string } }
) {
  try {
    if (!params.linkId) {
      return new NextResponse("Short value missing", { status: 400 });
    }

    const { password } = await req.json();

    if (!password) {
      return new NextResponse("Missing password", { status: 400 });
    }

    const link = await db.link.findUnique({
      where: {
        id: params.linkId,
      },
    });

    if (!link?.hashedPassword) {
      return new NextResponse("Password error", { status: 500 });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, link.hashedPassword);

    if (!isPasswordCorrect) {
      return new NextResponse("Incorrect password", { status: 400 });
    }

    return NextResponse.json(link.destination);
  } catch (error) {
    console.log("[LINK_PATH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
