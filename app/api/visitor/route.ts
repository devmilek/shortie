import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { linkId } = await req.json();

    const visitor = req.geo?.country;

    // console.log("[GEOLOCATION OF USER]", req.geo?.city);

    return NextResponse.json(visitor);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
