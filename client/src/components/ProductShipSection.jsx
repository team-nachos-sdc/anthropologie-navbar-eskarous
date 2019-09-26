import React from 'react';

var ProductShipSection = () => {
  return (
    <div className='product-ship'>
      <div className='ship-item'>
        <div className='input'>
          <input type='radio' checked='checked'></input>
          <div id='ship-caption'>SHIP THIS ITEM</div>
        </div>
      </div>
      <div className='pick-up'>
        <div className='container'>
          <div className='input'>
            <input type='radio'></input>
            <div id='pick-up-caption'>PICK UP IN A STORE</div>
          </div>
        </div>
        <div className='select-size'>Please Select a size to check store availability</div>
      </div>
      <div className='add'>
        <div className='basket-button'>ADD TO BASKET</div>
        <div className='container'>
          <div className='registry'>Add to Registry</div>
          <div className='empty'></div>
          <div className='wishlist'>Add to Wish List</div>
        </div>
      </div>
      <hr className='dotted'></hr>
    </div>
  )
}

export default ProductShipSection;