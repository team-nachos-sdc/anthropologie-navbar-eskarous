import React from 'react';
import { MdClose } from "react-icons/md";
let firstImage = 'https://i.imgur.com/077t37S.png';
let secondImage = 'https://i.imgur.com/9b3YPkM.png';
let thirdImage = 'https://i.imgur.com/XCxmIKC.png';

let AfterPayModal = ({ afterPay, handleAfterPayXClick }) => {
  return (
    <div className='after-pay-modal'>
      <MdClose className='icon' onClick={handleAfterPayXClick} />
      <div className='header'>
        <div className='installments'>
          <div className='line'>Installments by</div>
          <div className='image-container'>
            <img className='after-pay-modal-image' src={afterPay}></img>
          </div>
        </div>
        <div className='caption-container'>
          <div className='caption'>Shop Now. Enjoy Now. Pay Later.</div>
        </div>
      </div>
      <hr className='non-dotted' ></hr>
      <div className='three-images-container'>
        <div className='three-images'>
          <div><img src={firstImage} className='image'></img></div>
          <div><img src={secondImage} className='image'></img></div>
          <div><img src={thirdImage} className='image'></img></div>
        </div>
      </div>
      <div className='columns'>
        <div className='sign-up-column'>
          <div className='title'>Easy Sign-up</div>
          <div className='description'>
            Just select "Afterpay" as your form of payment at checkout on orders of $35-$1200.
            All you need is a debit or credit card (Visa or Mastercard).
          </div>
        </div>
        <div className='shipment'>
          <div className='title'>Instant Approval Decision & Shipment</div>
          <div className='description'>
            No long forms to fill out; you’ll receive an instant approval decision!
            Your order will be shipped as soon as it’s processed by Anthropologie.
          </div>
        </div>
        <div className='no-extra'>
          <div className='title'>Nothing Extra to Pay</div>
          <div className='description'>
            No interest, ever — and no additional fees when you pay on time.*
            Automatic payments are taken every two weeks in four equal installments.
          </div>
        </div>
      </div>
      <div className='button-container'>
        <div id='learn-more-button'>LEARN MORE</div>
      </div>
      <hr className='non-dotted' ></hr>
      <div className='terms-container'>
        <div className='terms'>
          * If funds are not available or you otherwise do not make your payment when it is due,
           late fees may apply. Click for complete terms.
        </div>
        <div className='agreement'>
          Purchase Payment Agreement
        </div>
      </div>
    </div>
  )
}

export default AfterPayModal;