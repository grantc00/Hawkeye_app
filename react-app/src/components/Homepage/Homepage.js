import React from "react";
import "./Homepage.css";
// import Slideshow from "./Slideshow";
import SlideshowOne from "./SlideshowOne";

const Homepage = () => {
  return (
    <div>
      <div className="homepage-main">
        <div className="homepage-main-left">
          <div>
            <h1>Investing for Everyone</h1>
          </div>
          <div>
            <span>
              Commission-free investing, plus the tools you need to put your
              money in motion. Sign up and get your first stock for free.
              Certain limitations and fees apply.
            </span>
          </div>
          <div className="homepage-signup">
            <a href="/sign-up">
              <span>Sign Up</span>
            </a>
          </div>
          <div>
            <span>Commissions & Free Stock Disclosures</span>
          </div>
        </div>
        <div className="homepage-main-right">
          <video
            className="homepage-video"
            autoPlay
            controlsList="nodownload nofullscreen noremoteplayback"
            loop
            muted
            playsInline=""
            preload="auto"
          >
            <source
              src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/3x__327bf4cc768a323497d5aaa7416319c2.mp4"
              type="video/mp4"
            />
            <img
              className="homepage-video-image"
              draggable="false"
              alt=""
              src="https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png"
              srcSet="https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png, https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png 2x, https://robinhood.com/us/en/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png 3x"
            />
          </video>
          <div className="homepage-video-overlay">
            <img
              className="overlay-image"
              src="https://cdn.robinhood.com/assets/robinhood/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <section className="homepage-session">{<SlideshowOne />}</section>

      <section className="homepage-session-slideshow">
        {/* <Slideshow /> */}
      </section>

      <footer>Hawkeye created with  ❤️  by Grant</footer>
    </div>
  );
};

export default Homepage;
