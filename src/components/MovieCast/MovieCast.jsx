import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { getFilmCreditsByFilmId } from "../../services/getMovies";
import { getCustomImagePath } from "../../helpers/buildImageUrl";
import { Error } from "components";
import img from "../../images/movieCast/anonymous.jpg";
import Loader from "../Loader/Loader";

export const MovieCast = () => {
  const { filmId } = useParams();

  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setCast([]);
      setError(false);
      setLoading(true);

      try {
        const {
          data: { cast },
        } = await getFilmCreditsByFilmId(filmId);

        setCast(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filmId]);

  return (
    <div className={s.wrapper}>
      <ul className={s.list}>
        {cast?.map((actor) => (
          <li key={actor.id} className={s.item}>
            {actor.profile_path ? (
              <img
                src={getCustomImagePath(actor.profile_path, 300)}
                alt={actor.character}
              />
            ) : (
              <img src={img} alt={actor.character} />
            )}

            <div className={s.infoWrapper}>
              <span className={s.name}>{actor.name}</span>
              <span className={s.hero}>{actor.character}</span>
            </div>
          </li>
        ))}
      </ul>

      {loading && <Loader />}
      {error && <Error error={error} />}
    </div>
  );
};
