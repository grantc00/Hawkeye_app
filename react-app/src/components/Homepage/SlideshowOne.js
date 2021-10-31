import React from "react";
import "./SlideshowOne.css";

const slides = [
  {
    image:
      "https://robinhood.com/us/en/_next/static/images/1x__1dc51da06e4c47882101e8aabc4dfa1a.png",
    name: "Learn",
  },
  {
    image:
      "https://robinhood.com/us/en/_next/static/images/1x__cc218f69a51669b005f94fb4bb01b7dc.png",
    name: "Manage",
  },
  {
    image:
      "https://robinhood.com/us/en/_next/static/images/1x__dcb58143461f83b86fb626f71b5ae6df.png",
    name: "Customize",
  },
];
const delay = 10000;

const SlideshowOne = () => {
  const [index, setIndex] = React.useState(0);

  const handleClick = (idx) => {
    setIndex(idx);
  };

  return (
    <div className="slideshowOne">
      <div className="slideshowPickers">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`slideshowPicker${index === idx ? " active" : ""}`}
            onClick={() => {
              handleClick(idx);
            }}
          >
            <h3>{slide.name}</h3>
          </div>
        ))}
      </div>
      <div
        className="slideshowSliderOne"
        style={{ transform: `translate3d(0, ${-index * 100}%, 0)` }}
      >
        <div className="slideOne">
          {slides.map((slide, idx) => (
            <div className="slideOne-main-text">
              <div
                key={idx}
                className="slideOne"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="slideOne-text">
                <h3>Learn As You Grow</h3>
                <p>
                  Our goal is to make investing in financial markets more
                  affordable, more intuitive, and more fun, no matter how much
                  experience you have (or don't have).
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideshowOne;
