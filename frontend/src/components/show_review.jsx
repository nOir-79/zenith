import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Rate, Typography, Upload } from "antd";
import React, { useEffect, useState } from "react";
import "../styles_handler/review.less";

const { Paragraph, Text } = Typography;

const Review = ({ review, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [newReview, setNewReview] = useState(review);
  const [newText, setNewText] = useState(review.text);
  const [newRating, setNewRating] = useState(review.rating);
  const [newImage, setNewImage] = useState(review.image || null);
  const [imageUploadType, setImageUploadType] = useState("link");
  const ReviewList = () => {
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      // Function to fetch reviews from the backend server
      const fetchReviews = async () => {
        try {
          const response = await fetch("/api/reviews"); // Replace with your backend endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch reviews');
          }
          const data = await response.json();
          setReviews(data); // Set the reviews state with the data fetched from the server
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
  
      fetchReviews(); // Call the fetchReviews function when the component mounts
    }, []); // Empty dependency array to ensure this effect runs only once when the component mounts
  
    const handleAddReview = async () => {
      if (newReview.text.trim() && newReview.rating > 0) {
        try {
          // Post the new review to the backend server
          const response = await fetch("/api/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          }); // Replace with your backend endpoint
          if (!response.ok) {
            throw new Error('Failed to add review');
          }
          // After successfully adding the review, fetch the updated list of reviews
          const responseData = await response.json();
          setReviews(responseData); // Set the reviews state with the updated data
          // Clear the new review state for the next review
          setNewReview({ text: "", rating: 0, image: null });
        } catch (error) {
          console.error("Error adding review:", error);
        }
      }
    };

  const handleUpdate = () => {
    onUpdate({ ...review, text: newText, rating: newRating, image: newImage });
    setEditing(false);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setNewImage(info.file.response.url);
    }
  };

  const renderEditingControls = () => (
    <>
      <Input.TextArea
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <Rate value={newRating} onChange={(value) => setNewRating(value)} />
      <div>
        <Button type="primary" onClick={() => setImageUploadType("link")}>
          Add Image Link
        </Button>
        <Button onClick={() => setImageUploadType("file")}>Upload Image</Button>
      </div>
      {imageUploadType === "link" && (
        <Input
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder="Enter image link"
        />
      )}
      {imageUploadType === "file" && (
        <Upload
          name="image"
          action="/upload" // Replace with your upload endpoint
          onChange={handleImageUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      )}
      <Button type="primary" onClick={handleUpdate}>
        Update
      </Button>
      <Button onClick={() => setEditing(false)}>Cancel</Button>
    </>
  );

  const renderReviewContent = () => (
    <>
      {review.image && (
        <img src={review.image} alt="Review" className="review-image" />
      )}
      <Paragraph className="review-text">{review.text}</Paragraph>
      <Text className="review-rating">Rating: {review.rating}/5</Text>
    </>
  );

  return (
    <div className="review-container">
      {editing ? renderEditingControls() : renderReviewContent()}
      <Button onClick={() => setEditing(true)}>Edit</Button>
      <Button onClick={() => onDelete(review.id)}>Delete</Button>
    </div>
  );
};
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Function to fetch reviews from the backend server
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews"); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data); // Set the reviews state with the data fetched from the server
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews(); // Call the fetchReviews function when the component mounts
  }, []); // Empty dependency array to ensure this effect runs only once when the component mounts

  const handleAddReview = async () => {
    if (newReview.text.trim() && newReview.rating > 0) {
      try {
        // Post the new review to the backend server
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        }); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to add review");
        }
        // After successfully adding the review, fetch the updated list of reviews
        const responseData = await response.json();
        setReviews(responseData); // Set the reviews state with the updated data
        // Clear the new review state for the next review
        setNewReview({ text: "", rating: 0, image: null });
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  // const handleAddReview = () => {
  //   if (newReview.text.trim() && newReview.rating > 0) {
  //     setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
  //     setNewReview({ text: "", rating: 0, image: null });
  //   }
  // };

  // const handleUpdateReview = (updatedReview) => {
  //   setReviews(
  //     reviews.map((review) =>
  //       review.id === updatedReview.id ? updatedReview : review
  //     )
  //   );
  // };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
  };

  return (
    <div className="review-list-container">
      <h1>Review</h1>
      <div className="review-input">
        <Input.TextArea
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          autoSize={{ minRows: 2, maxRows: 6 }}
          placeholder="Write a review"
        />
        <Rate
          value={newReview.rating}
          onChange={(value) => setNewReview({ ...newReview, rating: value })}
        />
        <Button type="primary" onClick={handleAddReview}>
          Add Review
        </Button>
      </div>
      <div className="reviews">
        {reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
            onUpdate={handleUpdateReview}
            onDelete={handleDeleteReview}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
