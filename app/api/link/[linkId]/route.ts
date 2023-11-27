import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { linkId: string } }
) {
  try {
    if (!params.linkId) {
      return new NextResponse("Short value missing", { status: 400 });
    }

    const { destination, password, expiresAt, shortValue } = await req.json();

    if (!destination || !shortValue) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = bcrypt.hashSync(password, 10);
    }

    const link = await db.link.update({
      where: {
        id: params.linkId,
        profileId: session.user.id,
      },
      data: {
        destination,
        hashedPassword,
        expiresAt,
        shortValue,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("[LINK_PATH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.linkId) {
      return new NextResponse("Short value missing", { status: 400 });
    }

    const link = await db.link.delete({
      where: {
        id: params.linkId,
        profileId: session.user.id,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.log("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
