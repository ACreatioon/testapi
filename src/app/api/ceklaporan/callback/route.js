import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("Callback CekLaporan:", body);

    return NextResponse.json({
      status: "ok",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { status: "error", message: "Invalid payload" },
      { status: 400 }
    );
  }
}
