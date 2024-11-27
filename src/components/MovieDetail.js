import React, { useState } from "react";
import moment from "moment";
import "../css/App.css";

const MovieDetail = ({ movie, onClose }) => {
  // 리뷰 평점 상태 관리 (기본값 5점)
  const [rate, setRate] = useState('5');
  // 리뷰 내용 상태 관리
  const [review, setReview] = useState("");
  // 리뷰 목록 상태 관리
  const [reviewList, setReviewList] = useState([]);

  // 리뷰 등록 핸들러
  const handleReviewSubmit = () => {
    // 빈 리뷰 방지
    if (!review.trim()) return; 

    // 새 리뷰 객체 생성
    const newReview = {
      id: reviewList.length + 1,
      user: "유저 이름",
      rate: Number(rate),
      review: review,
      date: moment().format('MM/DD HH:mm')
    };
    // 리뷰 리스트에 새 리뷰 추가 (최신 리뷰가 맨 위로)
    setReviewList(prev => [newReview, ...prev]);
    // 리뷰 입력창 초기화
    setReview("");
  };

  // 리뷰 삭제 핸들러
  const handleRemoveReview = (id) => {
    // 해당 ID의 리뷰를 제외한 새 리스트 생성
    const updatedList = reviewList.filter((item) => item.id !== id);
    setReviewList(updatedList);
  };

  // 평균 평점 계산 함수
  const calculateAverageRate = () => {
    // 리뷰가 없으면 0 반환
    if (reviewList.length === 0) return 0;
    // 모든 리뷰 평점 합산 후 평균 계산
    const totalRate = reviewList.reduce((sum, item) => sum + item.rate, 0);
    return (totalRate / reviewList.length).toFixed(2);
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>X</button>
        
        <div className="movie-detail-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-detail-poster"
          />
          
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p>{movie.overview}</p>

            <div className="review-section">
              <h2>리뷰 작성</h2>
              <p>
                <strong>평균 리뷰 점수:</strong>{" "}
                {reviewList.length > 0 ? calculateAverageRate() : "아직 리뷰가 없습니다."}
              </p>

              <div className="review-input">
                <select 
                  name="rate" 
                  value={rate} 
                  onChange={(e) => setRate(e.target.value)}
                >
                  <option value="5">★★★★★</option>
                  <option value="4">★★★★☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="1">★☆☆☆☆</option>
                </select>
                <input
                  type="text"
                  placeholder="리뷰 내용을 입력해주세요"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <button onClick={handleReviewSubmit}>등록</button>
              </div>

              <div className="review-list">
                <h3>리뷰 목록</h3>
                <ul>
                  {reviewList.map((item) => (
                    <li key={item.id}>
                      <strong>{item.user}</strong> ({item.rate}★): {item.review}{" "}
                      <span className="review-date">{item.date}</span>
                      <button 
                        onClick={() => handleRemoveReview(item.id)}
                        className="delete-review-btn"
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;