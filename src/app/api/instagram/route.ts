import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN

  if (!token) {
    return NextResponse.json({ error: "Missing access token" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${token}`
    , { cache: 'no-store' });

    const data = await res.json();

   if (!res.ok) {
  console.log("Instagram error response:", data);
  return NextResponse.json(
    { error: "Instagram error", details: data },
    { status: res.status }
  );
}

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch Instagram feed", details: error.message },
      { status: 500 }
    );
  }
}
