import React from 'react';

var SizeList = ({ sizes, sizesUnavailable, clickSizeChange }) => {
 return (
   <div className='size-list'>
     {sizes.map((size, index) => {
       if (index === 0){
         return (
           <div className='container' key={index}>
            <div className={`first ${size}`} value={size} onClick={clickSizeChange}>{size}</div>
           </div>
         )
       } else if (size === sizesUnavailable){
         return (
          <div className='container' key={index}>
           <div className={`unavailable ${size}`} value={size} onClick={clickSizeChange}>{size}</div>
          </div>
         )
       } 
       else {
         return (
          <div className='container' key={index}>
           <div className={`available ${size}`} value={size} onClick={clickSizeChange}>{size}</div>
          </div>
         )
       }
     })}
   </div>
 ) 
}

export default SizeList;