import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/edge";

export const runtime = "edge";

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
    const body = await req.json();

    const geo = geolocation(req);

    console.log("[SERVERS_POST]", body, geo);

    return NextResponse.json({ ...geo });
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
