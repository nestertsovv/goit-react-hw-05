import s from "./LoadMore.module.css";

export const LoadMore = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={s.btn}>
      Load more
    </button>
  );
};
