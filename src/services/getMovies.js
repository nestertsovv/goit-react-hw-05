import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODNlYTM2ODJiNzBhYmI4NjdlMzJjYjA2MjAwODQ1NCIsIm5iZiI6MTcxOTIzNDg1OC4xNjM1Nywic3ViIjoiNjY3OTcwNDdhOGJlNDgzYTgzODJmNjY1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rEObgE9mVdZVg3cjyiDBZvYFl54m--QpO8QrOAh6ICI";

export const getTrendingMovies = async () => {
  const data = await axios.get("/trending/movie/day");
  return data;
};

export const getFilmById = async (id) => {
  const data = await axios.get(`/movie/${id}`);
  return data;
};

export const getFilmCreditsByFilmId = async (id) => {
  const data = await axios.get(`/movie/${id}/credits`);
  return data;
};

export const getFilmReviewsByFilmId = async (id) => {
  const data = await axios.get(`/movie/${id}/reviews`);
  return data;
};

export const getMovieByName = async (query, page) => {
  const data = await axios.get(`/search/movie`, {
    params: {
      query,
      page,
    },
  });
  return data;
};
