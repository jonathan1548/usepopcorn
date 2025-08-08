import { useEffect, useState } from "react";
const Key = "ac675b32";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error(" something went wrong with fetching movies");
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error(" movie not found");
          }

          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
