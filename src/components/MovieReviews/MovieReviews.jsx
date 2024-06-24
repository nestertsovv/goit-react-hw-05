import { useParams } from "react-router-dom";
import { getFilmReviewsByFilmId } from "../../services/getMovies";
import s from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { Error } from "../Error/Error";
import Loader from "../Loader/Loader";

export const MovieReviews = () => {
  const { filmId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setReviews([]);
      setError(false);

      try {
        const {
          data: { results },
        } = await getFilmReviewsByFilmId(filmId);

        setReviews(results);
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
      {reviews.length > 0 ? (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li key={review.id} className={s.item}>
              <span className={s.author}>
                Author: <span className={s.bold}>{review.author}</span>
              </span>
              <p>{review.content}</p>
              <p>
                Publication date:{" "}
                <span className={s.bold}>{review.created_at.slice(0, 10)}</span>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <Error error="We don't have any reviews for this movie." />
      )}

      {loading && <Loader />}
    </div>
  );
};
