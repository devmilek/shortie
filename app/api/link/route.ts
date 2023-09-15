import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { longLink, password, expiresAt, shortValue } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const shortValueTaken = await db.link.findUnique({
      where: {
        shortValue,
      },
    });

    if (shortValueTaken) {
      return new NextResponse("Short value already taken", { status: 400 });
    }

    const link = await db.link.create({
      data: {
        shortValue,
        longLink,
        password,
        expiresAt,
        profileId: profile.id,
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
