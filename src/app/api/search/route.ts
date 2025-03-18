import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
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

    if (data.length === 0) {
      return NextResponse.json({
        error: "Movie not found",
        status: 404,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
