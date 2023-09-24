import { Link } from "react-router-dom";
import { MovieItem } from "../response/MovieResponse";

function Movie({ movie }: { movie: MovieItem }) {
  return (
    <div>
      {movie.medium_cover_image ? (
        <img src={movie.medium_cover_image} alt={movie.title} />
      ) : null}
      <h2>
        <Link to={`/movie/${movie.id}`}>{movie.title ?? ""}</Link>
      </h2>
      <p>{movie.summary ?? ""}</p>
      <ul>
        {movie.genres
          ? movie.genres?.map((genre) => <li key={genre}>{genre}</li>)
          : null}
      </ul>
    </div>
  );
}

export default Movie;
