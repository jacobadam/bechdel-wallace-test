import { Movie } from "../types/movieTypes";

export async function getMovieByTitle(title: string): Promise<Movie[]> {
  const titleWithoutThe = title.replace(/^(the\s+)/i, "");

  const response = await fetch(
    `api/search/?title=${encodeURIComponent(titleWithoutThe)}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
