import React from 'react';

let Picture = ({ picture, changeMainPicture, checkIfPictureClickedInPictureList, id }) => {
  return (
    <div className='picture'>
      <div className={`container ${id}`} onClick={(event) => {changeMainPicture(event); checkIfPictureClickedInPictureList(event);}}>
        <img src={`${picture}`} className={`picture ${id}`}></img>
      </div>
    </div>
  )
}

export default Picture;