import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import "../styles/productCard.css";

function ProductCard(props) {
  const { product } = props;
  const { name, price, rating } = product;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscsdflksdf;lej;lfie;fij;lljfldjkkf;lkj";
  const image = "car.jpg";
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} />);
    }
    return stars;
  };
  const styles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="product-img" style={styles}></div>
          <div className="product-detail">
            <span>{name}</span>
            <div className="rating">{renderStars(rating)}</div>
            <p>{description}</p>
            <div className="buttons">
              <div className="price">{price}</div>
              <button className="cart btn">Add to cart</button>
              <button className="favourite btn">
                <FaHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
