import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { getFilmById } from "../../services/getMovies";
import { Error } from "components";
import { getCustomImagePath } from "../../helpers/buildImageUrl";
import { ImArrowLeft2 } from "react-icons/im";
import Loader from "../../components/Loader/Loader";
import clsx from "clsx";
import s from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { filmId } = useParams();
  const location = useLocation();

  const [film, setFilm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getFilmById(filmId);
        setFilm(data);
      } catch (error) {
        setError(error.response.status);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filmId]);

  const goBack = useRef(location.state || "/movies");

  return (
    <>
      {loading && <Loader />}

      <div className={s.goBack}>
        <Link to={goBack.current}>
          <ImArrowLeft2 />
          Go back
        </Link>
      </div>
      {film && (
        <div className={s.mainWrapper}>
          <div className={s.wrapper}>
            <div className={s.imgWrapper}>
              <img
                src={getCustomImagePath(film.poster_path, 400)}
                alt={film.title}
              />
            </div>
            <div className={s.details}>
              <h1>{film.title}</h1>
              <p>
                Rating:{" "}
                <span className={s.bold}>
                  <span
                    className={clsx(film.vote_average >= 6 ? s.high : s.low)}
                  >
                    {film.vote_average.toFixed(1)}
                  </span>{" "}
                  / 10
                </span>
              </p>
              <h2>Overview</h2>
              <p>{film.overview}</p>
              <h3>Genres</h3>
              <ul className={s.genreList}>
                {film.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.info}>
            <h3 className={s.additionalTitle}>Additional info</h3>
            <ul className={s.additionalInfo}>
              <li>
                <NavLink to="cast" className={buildLinkClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={buildLinkClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>

            <Outlet />
          </div>
        </div>
      )}
      {error && <Error status={error} />}
    </>
  );
};

export default MovieDetailsPage;
