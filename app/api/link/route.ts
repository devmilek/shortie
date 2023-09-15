import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { longLink, password, expiresAt } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("[SERVERS_POST]", profile.id);

    const link = await db.link.create({
      data: {
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
