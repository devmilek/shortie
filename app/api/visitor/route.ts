import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { linkId } = await req.json();

    const visitor = linkId;

    // console.log("[GEOLOCATION OF USER]", req.geo?.city);

    return NextResponse.json(visitor);
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
