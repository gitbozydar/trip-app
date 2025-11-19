import { NextResponse } from "next/server";
import { saveReservation } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await saveReservation(data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
