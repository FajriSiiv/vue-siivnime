import fetchWithRetry from "@/utils/fetchAPiRetry";

const BASE_URL = "https://api.jikan.moe/v4";

export const getTopAnimes = async (
  page = 1,
  filter?: string,
  type?: string
) => {
  const url = `${BASE_URL}/top/anime?${page > 1 ? `page=${page}` : ""}${
    filter ? `&filter=${filter}` : ""
  }${type ? `&type=${type}` : ""}&sfw=true`;

  return fetchWithRetry(url);
};

export const getTopRecentAnimes = async (page = 1) => {
  const url = `${BASE_URL}/top/anime?filter=airing&${
    page > 1 ? `page=${page}` : ""
  }&sfw=true`;

  return fetchWithRetry(url);
};

export const getPopularThisSeasons = async (page = 1) => {
  const url = `${BASE_URL}/seasons/now${page > 1 ? `?page=${page}` : ""}`;

  return fetchWithRetry(url);
};

export const getAnimeUpcoming = async () => {
  const url = `${BASE_URL}/seasons/upcoming?&sfw=true`;
  return fetchWithRetry(url);
};

export const getSearchAnime = async (
  page = 1,
  searchAnime?: string,
  genres?: number
) => {
  const url = `${BASE_URL}/anime?q=${searchAnime}&page=${page}&sfw=true${
    genres || genres === 0 ? `&genres=${genres?.toString()}` : ""
  }`;

  return fetchWithRetry(url);
};

export const getGenresAnime = async () => {
  const url = `${BASE_URL}/genres/anime`;

  return fetchWithRetry(url);
};

export const getAnimeByID = async (id: string) => {
  const url = `${BASE_URL}/anime/${id}/full`;

  return fetchWithRetry(url);
};
