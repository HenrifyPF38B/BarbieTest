import React, { useEffect, useState } from "react";
import styles from "./userReviews.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
//import { postReviews } from "../redux/Actions/ReviewsActions";

const RateUsModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const state = useSelector((state) => state);
  const { usersId } = state;

//const dispatch = useDispatch();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  
  const handleSubmitReview = async () => {

    if (!usersId || !usersId.firstName) {
      return alert("User is not registered");
    }

    console.log("usuario: " + usersId.id);
    if (rating === 0) return alert("Missing rating");

    const bodyReview = {
      comment: comment,
      rating: rating,
      UserId: usersId.id,
    };
  //return console.log("usersId" + usersId.id);
    //dispatch(postReviews(bodyReview));
     try {
      const postReview = (
        await axios.post("http://localhost:3001/api/reviews/", bodyReview)
      ).data;
      //console.log("post Review: " + postReview.data);
      if (postReview) {
        setIsReviewSubmitted(true);
        return alert("Review Created");
      } else {
        return alert("Error submitting review");
      }
    } catch (error) {
      return alert(error.message);
    }
  }; 
    /* console.log("Usuario: " + usersId.firstName);
    console.log("Valor de reviewUser:", reviewUser);
    console.log("Post reduce", reviewUser); */
  //}
/*    useEffect(() => {
   if (review) {
      if (review.includes("Review Created")) {
        setIsReviewSubmitted(true);
        setRating(0);
        setComment("");
      }
    }

  }, []);   */
    
   
    
    
  
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="containerbntReviews">
          <div className="infReview">
            <h2 className="valoranos">Rate us!</h2>
          </div>
          <button className="buttonModalReviews" onClick={onClose}>
            X
          </button>
        </div>
        <div className="datUserReview">
          <div className="dataUserModal">
            <img className="avatarReviewModal" src={usersId.avatar} alt="" />

            <h3 className="nameh2">
              {usersId.firstName + " "} {usersId.lastName}
            </h3>
          </div>
          <div className={styles.rating}>
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
            className="containerTextTarea"
            placeholder="Enter your comment..."
            value={comment}
            rows="5"
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <div className="btnreview">
          <button
            className="submit_btn"
            onClick= {handleSubmitReview}
            disabled={isReviewSubmitted}
          >
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateUsModal;
