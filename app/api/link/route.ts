import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { destination, password, expiresAt, shortValue } = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shortValueTaken = await db.link.findUnique({
      where: {
        shortValue,
      },
    });

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }

    if (shortValueTaken) {
      return new NextResponse("Short value already taken", { status: 400 });
    }

    const link = await db.link.create({
      data: {
        shortValue,
        destination,
        hashedPassword,
        expiresAt,
        profileId: session.user.id,
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
