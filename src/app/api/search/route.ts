import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");
  if (!title) {
    return NextResponse.json(
      { error: "Missing title parameter" },
      { status: 400 }
    );
  }

  const encodedTitle = encodeURIComponent(title);
  const searchResults = await fetch(
    `http://bechdeltest.com/api/v1/getMoviesByTitle?title=${encodedTitle}`
  );

  if (!searchResults.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: searchResults.status }
    );
  }

  const data = await searchResults.json();

  return NextResponse.json({ encodedTitle, data });
}
