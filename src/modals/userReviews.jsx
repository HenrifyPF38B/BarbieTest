import React, { useState } from "react";
import styles from "./userReviews.module.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { postReviews } from "../redux/Actions/ReviewsActions";

const RateUsModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const state = useSelector((state) => state);
  const { usersId, reviewUser } = state;

  const dispatch = useDispatch()

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitReview = async (usersId) => {
    if (!usersId) return alert("Not registered");

    if (rating === 0) return alert("Missing rating");

    const bodyReview = {
      comment: comment,
      rating: rating,
      UserId: usersId.id
    };
    
    dispatch(postReviews(bodyReview));
    console.log("bodyReview: " , bodyReview)
    console.log("Post reduce", reviewUser)
     
  
    /* if (!reviewUser.length) return alert("No se creo")
    return reviewUser; */
    
  }; 

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Valóranos</h2>

        <h2 className={styles.review.h2}>Membership Reviews</h2>
        <div>
          <h3>
            {" "}
            {usersId.firstName + " "} {usersId.lastName}
          </h3>
          <img className={styles.avatarReview} src={usersId.avatar} alt="" />
        </div>
        <div className={styles.rating}>
          {/* <p className={styles.rating.p}>Your rating: {rating} stars</p> */}
          <div className={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? styles.starfilled : "star"}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <textarea
          className={styles.comment}
          placeholder="Enter your comment..."
          value={comment}
          rows="5"
          onChange={handleCommentChange}
        ></textarea>
        <button
          className={styles.submit_btn}
          onClick={handleSubmitReview}
          disabled={isReviewSubmitted}
        >
          Submit Review
        </button>
      </div>

      <div className="containerbntReviews">
        <button className="buttonModalReviews" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default RateUsModal;
