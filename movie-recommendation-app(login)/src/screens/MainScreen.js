import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../AppContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchPopularMovies, searchMovies } from "../api/tmdb";
import "../css/MainScreen.css"

// 영화 목록 컴포넌트
const MovieList = ({ movies, onSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Movies..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// 메인 화면 컴포넌트
const MainScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, setUser } = useContext(AppContext)

  // 인기 영화 가져오기
  useEffect(() => {
    const getPopularMovies = async () => {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    };

    getPopularMovies();
  }, []);

  // 영화 검색 기능
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
    } else {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    }
  };

  const navigate = useNavigate()

  //로그인 버튼 클릭 시 LoginScreen으로 이동
  const navigateToLoginScreen = () => {
    navigate("/login")
  }

  //로그아웃 버튼 클릭 시
  const handleLogout = () => {
    setUser(null) // 사용자 로그아웃 처리
    navigate("/login") // 다시 LoginScreen으로 이동(로그인버튼 확인하고싶으면 이부분 주석처리하고 확인해보기) 
  }

  return (
    <div className="app">
      <div className="main-header">
        <h1>영화 추천</h1>
        {/* 로그인하면 로그아웃버튼으로, 로그아웃하면 로그인버튼으로 */}
        { user ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={navigateToLoginScreen}>로그인</button>
        )}
      </div>
      <MovieList movies={movies} onSearch={handleSearch} />
    </div>
  );
};

export default MainScreen;
