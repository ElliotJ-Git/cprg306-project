import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { username, character } = body;

  if (!username || !character) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    );
  }

  const filename = `characters/${username}/${crypto.randomUUID()}.json`;

  await put(filename, JSON.stringify(character), {
    access: "private",
    contentType: "application/json",
  });

  return NextResponse.json({ success: true });
}
