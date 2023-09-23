import { useEffect, useState } from "react";
import { MovieItem, MovieResponse } from "../response/MovieResponse";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieItem[]>([]);

  const getMoviews = async () => {
    const response = (await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
      )
    ).json()) as MovieResponse;

    setMovies(response.data?.movies ?? []);
    setLoading(false);
  };

  useEffect(() => {
    getMoviews();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
