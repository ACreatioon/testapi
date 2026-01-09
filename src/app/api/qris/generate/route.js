import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();

    const PARTNER_ID = process.env.CEKLAPORAN_PID;
    const API_KEY = process.env.CEKLAPORAN_APIKEY;

    const timestamp = new Date().toISOString();

    const payload = {
      partner_id: PARTNER_ID,
      refid: body.refid,
      amount: body.amount,
      exp_date: body.exp_date,
      is_static: body.is_static ?? false,
    };

    const signature = "06f29044a840e13b21e1820205e856405819a38d458ccc7dc90b6de157dba6fa";
    
    const response = await fetch(
      "https://gateway.ceklaporan.com/api/qr/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: API_KEY,
          "X-Timestamp": timestamp,
          "X-signature": signature,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    return Response.json(result, {
      status: response.ok ? 200 : 400,
    });
  } catch (error) {
    return Response.json(
      {
        status: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
