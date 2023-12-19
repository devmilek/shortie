import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";
import { getUserOS } from "@/utils/get-user-os";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      linkId: string;
    };
  }
) {
  try {
    const { os, browserName, device } = await req.json();

<<<<<<< HEAD
    await db.visitor.create({
      data: {
        browserName: browserName ? browserName : "unknown",
        os: os ? os : "unknown",
        device: device ? device : "unknown",
        linkId: params.linkId,
      },
    });

    return NextResponse.json({});
=======
    const { city } = geolocation(req);

    console.log("[SERVERS_POST]", body, city);

    return NextResponse.json({ city });
>>>>>>> parent of acaa4ad (test geo verccel)
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
