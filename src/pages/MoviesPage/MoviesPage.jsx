import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./MoviesPage.module.css";
import * as Yup from "yup";
import { Suspense, useEffect, useState } from "react";
import { getMovieByName } from "../../services/getMovies";
import { MovieList } from "../../components/MovieList/MovieList";
import { Error } from "../../components/Error/Error";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { LoadMore } from "../../components/LoadMore/LoadMore";

const initialValues = { text: "" };

const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(3, "Too short name")
    .max(15, "Too long name")
    .required("Enter movie name"),
});

const per_page = 20;

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query");

    if (!query) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const {
          data: { results, total_results },
        } = await getMovieByName(query, page);

        if (!total_results) {
          setIsEmpty(true);
          return;
        }

        setFilms((prev) => [...prev, ...results]);
        setShowLoadMore(page < Math.ceil(total_results / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, page]);

  const submitForm = (value, actions) => {
    setFilms([]);
    setError(false);
    setIsEmpty(false);
    setShowLoadMore(false);
    setSearchParams({ query: value.text });
    actions.resetForm();
  };

  const onLoadMore = async () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        <Form className={s.form}>
          <div className={s.row}>
            <Field
              type="search"
              name="text"
              placeholder="Enter your wishes..."
            />
            <ErrorMessage className={s.error} name="text" component="span" />
          </div>
          <button type="submit" className={s.btn}>
            Search
          </button>
        </Form>
      </Formik>

      {loading && <Loader />}

      {films.length > 0 && !isEmpty && <MovieList films={films} />}
      {showLoadMore && !loading && <LoadMore onLoadMore={onLoadMore} />}

      {isEmpty && <Error />}
      {error && <Error error={error} />}
    </div>
  );
};

export default MoviesPage;
