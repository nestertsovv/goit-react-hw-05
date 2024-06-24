export const getFullImagePath = (img) => {
  return `https://image.tmdb.org/t/p/original${img}`;
};

export const getCustomImagePath = (img, width) => {
  return `https://image.tmdb.org/t/p/w${width + img}`;
};
