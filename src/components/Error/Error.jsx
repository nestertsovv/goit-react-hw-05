import s from "./Error.module.css";
import img from "../../images/error/error_img.jpg";

export const Error = ({ error }) => {
  const errorMessage = error || "Whoops! We can't find this movie :(";

  return (
    <>
      <div className={s.wrapper}>
        <p className={s.error}>{errorMessage}</p>
      </div>
    </>
  );
};
