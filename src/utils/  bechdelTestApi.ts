import { Movie } from "../types/movieTypes";

export async function getMovieByTitle(title: string): Promise<Movie[]> {
  console.log("fetch");
  const titleWithoutThe = title.replace(/^(the\s+)/i, "");

  console.log(titleWithoutThe);
  const response = await fetch(
    `api/search/?title=${encodeURIComponent(titleWithoutThe)}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
