import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function DELETE(
  req: Request,
  { params }: { params: { shortValue: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.shortValue) {
      return new NextResponse("Short value missing", { status: 400 });
    }

    const link = await db.link.delete({
      where: {
        shortValue: params.shortValue,
        profileId: session.user.id,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
