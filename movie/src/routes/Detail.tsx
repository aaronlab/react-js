import { useParams } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { useEffect } from "react";

function Detail() {
  const { id } = useParams();

  const getMovie = async () => {
    if (!id) {
      return undefined;
    }

    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    console.log(json);

    return json;
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (id) {
    return <h1>Detail</h1>;
  } else {
    return <NotFound />;
  }
}

export default Detail;
