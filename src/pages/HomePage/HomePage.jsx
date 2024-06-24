import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/getMovies";
import { getCustomImagePath } from "../../helpers/buildImageUrl";
import s from "./HomePage.module.css";
import { Link, useLocation } from "react-router-dom";
import { MovieList } from "../../components/MovieList/MovieList";
import { Error } from "../../components";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const {
          data: { results },
        } = await getTrendingMovies();
        setFilms(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {films.length > 0 && (
        <>
          <h1 className={s.title}>Trending today</h1>
          <MovieList films={films} />
        </>
      )}
      {loading && <Loader />}
      {error && <Error error={error} />}
    </div>
  );
};

export default HomePage;
