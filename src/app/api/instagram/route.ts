import { NextResponse } from "next/server";

export async function GET() {
  const token = "IGAALYdvqgNvRBZAFNPSk9jVG55WmJhSmtPRnRxeGV5ZAnptOXlveWZAfeF94VzJTSUVzSmhKcW9rdFp1S1c4ZAjM4M2lVRXZAIdW5GcGdCbzBfSW4wdk4yV2Y4MXZA1RUo4OVZACbFZAoSmpUdEpPVHBJb3U2cVpqejR5TTVTQTdyNjhSQQZDZD"

  if (!token) {
    return NextResponse.json({ error: "Missing access token" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${token}`
    );

    if (!res.ok) {
      throw new Error(`Instagram API error: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch Instagram feed", details: error.message },
      { status: 500 }
    );
  }
}
