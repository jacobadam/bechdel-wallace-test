import { NextRequest, NextResponse } from "next/server";
import { decode } from "html-entities";

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

    let data = await searchResults.json();

    if (Array.isArray(data)) {
      data = data.map((item) => {
        if (typeof item.title === "string") {
          return { ...item, title: decode(item.title) };
        }
        return item;
      });
    } else if (typeof data.title === "string") {
      data.title = decode(data.title);
    }

    if (Array.isArray(data) && data.length === 0) {
      return NextResponse.json({
        error: "Movie not found",
        status: 404,
      });
    } else if (!Array.isArray(data) && !data.title) {
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
