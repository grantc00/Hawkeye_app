import React from 'react';
import './Homepage.css';

const Homepage = () => {
  return (
    <div>
      <video
        className='homepage-video'
        autoPlay
        controlsList='nodownload nofullscreen noremoteplayback'
        loop
        muted
        playsInline=''
        preload='auto'
      >
        <source
          src='https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4'
          type='video/mp4'
        />
        <img
          className='homepage-video-image'
          draggable='false'
          alt=''
          src='https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png'
          srcSet='https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png, https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png 2x, https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png 3x'
        />
      </video>
      <div className='homepage-video-overlay'>
        <img
          className='overlay-image'
          src='https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png'
          alt=''
        />
      </div>
    </div>
  );
};

export default Homepage;
