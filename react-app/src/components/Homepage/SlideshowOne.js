import React from 'react';
import './SlideshowOne.css';

const slides = [
  {
    header: 'Learn As You Grow',
    des: 'Our goal is to make investing in financial markets more affordable',
    image:
      'https://robinhood.com/us/en/_next/static/images/1x__1dc51da06e4c47882101e8aabc4dfa1a.png',
    name: 'Learn',
  },
  {
    header: 'Manage Your Portfolio',
    des: `Keep your portfolio and Manage your assets is available in a single app.`,
    image:
      'https://robinhood.com/us/en/_next/static/images/1x__cc218f69a51669b005f94fb4bb01b7dc.png',
    name: 'Manage',
  },
  {
    header: 'Keep Tabs on Your Money',
    des: 'Set up customized news and notifications to stay on top of your assets',
    image:
      'https://robinhood.com/us/en/_next/static/images/1x__dcb58143461f83b86fb626f71b5ae6df.png',
    name: 'Customize',
  },
];
const delay = 2500;

const SlideshowOne = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  // const handleClick = (idx) => {
  //   setIndex(idx);
  // };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {};
  }, [index]);

  return (
    <div className='slideshowOne'>
      <div className='slideshowPickers'>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`slideshowPicker${index === idx ? ' active' : ''}`}
            onClick={() => {
              // handleClick(idx);
              setIndex(idx);
            }}
          >
            <h2>{slide.name}</h2>
          </div>
        ))}
      </div>
      <div
        className='slideshowSliderOne'
        style={{ transform: `translate3d(0, ${-index * 100}%, 0)` }}
      >
        <div className='slideOne'>
          {slides.map((slide, idx) => (
            <div className='slideOne-main-text'>
              <div
                key={idx}
                className='slideOne'
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className='slideOne-text'>
                <h1>{slide.header}</h1>
                <div>{slide.des}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideshowOne;
