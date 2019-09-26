import React from 'react';
import { FiInfo } from "react-icons/fi";
import StarRatings from 'react-star-ratings';

let ProductTitleSection = ({ pictureData, afterPay, handleAfterPayInfoClick }) => {
  let { brand_name, online_exclusive, price, product_name,
    review_count, review_star_count } = pictureData;
  let roundedPrice = (price / 4).toFixed(2);
  let exclusive = online_exclusive ? 'Online Exclusive' : 'Enjoy FREE RETURNS for Plus Styles!';
  
  if (pictureData) {
    return (
      <div>
        <div className='product-title'>
          <div className='name'>{product_name}</div>
          <div className='price'>${price}.00</div>
          <div className='payment'>
            <div className='caption'>Or 4 interest-free installments of ${roundedPrice} by</div>
            <div><img className='after-pay' src={afterPay}></img></div>
            <div className='info-circle'>
              <FiInfo className='icon' onClick={handleAfterPayInfoClick}/>
            </div>
          </div>
          <div className='brand-name'>{brand_name}</div>
          <div className='exclusive'>{exclusive}</div>
          <div className='star-reviews'>
            <div className='star-image'>
              <StarRatings rating={Number(review_star_count)} starRatedColor='#fcc603' numberOfStars={5}
                starDimension={'15px'} starSpacing={'-1px'}
              />
            </div>
            <div className='star-count'>{review_star_count}</div>
            <div className='review-count'>{review_count} Reviews</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default ProductTitleSection;