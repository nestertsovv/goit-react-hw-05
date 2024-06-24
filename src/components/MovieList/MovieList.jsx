import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import { getCustomImagePath } from "../../helpers/buildImageUrl";
import img from "../../images/movieList/no_image.png";

export const MovieList = ({ films }) => {
  const location = useLocation();

  return (
    <ul className={s.list}>
      {films.map((film) => (
        <li key={film.id} className={s.item}>
          <Link to={`/movies/${film.id}`} state={location}>
            <div className={s.imgWrapper}>
              {film.poster_path ? (
                <img src={getCustomImagePath(film.poster_path, 500)} />
              ) : (
                <img src={img} />
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
