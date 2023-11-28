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

    await db.visitor.create({
      data: {
        browserName: browserName ? browserName : "unknown",
        os: os ? os : "unknown",
        device: device ? device : "unknown",
        linkId: params.linkId,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
