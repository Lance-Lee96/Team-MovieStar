import axios from "axios";

// TMDb API 기본 URL과 API 키 (사이트에서 API키 발급받아야함 자세한 방법은 인터넷 검색하면됨)
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;  // 여기 API 키를 입력
const API_URL = "https://api.themoviedb.org/3";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

// 인기 영화 리스트 가져오기
export const fetchPopularMovies = async () => {
  try {
    const response = await instance.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

// 영화 검색하기
export const searchMovies = async (query) => {
  try {
    const response = await instance.get("/search/movie", {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching for movies:", error);
    return [];
  }
};

// 영화 상세 정보 가져오기
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await instance.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {};
  }
};