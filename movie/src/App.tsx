import { useEffect, useState } from "react";
import "./App.css";

type Movie = {
  id: number;
  url?: string;
  title?: string;
  summary?: string;
  genres?: string[];
  medium_cover_image?: string;
};

type MovieData = {
  movies?: Movie[];
};

type MovieResponse = {
  data?: MovieData;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

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
            <div key={movie.id}>
              {movie.medium_cover_image ? (
                <img src={movie.medium_cover_image} alt="MovieCoverImage" />
              ) : null}
              <h2>{movie.title ?? ""}</h2>
              <p>{movie.summary ?? ""}</p>
              <ul>
                {movie.genres
                  ? movie.genres?.map((genre) => <li key={genre}>{genre}</li>)
                  : null}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
