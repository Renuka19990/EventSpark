import { useEffect, useState } from "react";
import "../styles/banner.css"; 
import img1 from "../assets/img1.1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import organizer from '../assets/organizer.jpg';

const MagicBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
    setIsNext(true);
    setIsPrev(false);
    setTimeout(() => {
      setIsNext(false);
    }, 500); 
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? 3 : prevSlide - 1));
    setIsPrev(true);
    setIsNext(false);
    setTimeout(() => {
      setIsPrev(false);
    }, 500); 
  }; // Add the closing curly brace here

  // Automatically click next slide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3500); 

    return () => clearTimeout(timer);
  }, [currentSlide]); 

  return (
    <div className="mt-12 lg:mt-10">
      <div className={`carousel ${isNext ? "next" : ""} ${isPrev ? "prev" : ""}`}>
        <div className="list">
          {[img1, img2, img3, img4].map((img, index) => (
            <div
              className="item"
              key={index}
              style={{ display: currentSlide === index ? "block" : "none" }}
            >
              <img
                className="brightness-[0.60]"
                src={img}
                alt={`Slide ${index + 1}`}
              />

              <div className="content  text-left " >
                {/* using tailwind  */}
                <div>
                  <div>
                    <p className="text-xl ml-1 font-semibold tracking-wider text-slate-300">Dream Craft Events</p>
                  </div>
                  <div className="my-5"><h1 className="text-3xl lg:text-6xl font-bold text-slate-200">Our Events</h1></div>
                  <div className="my-5"><h1 className="drop-shadow-2xl text-lime-500 text-5xl lg:text-7xl font-bold">Book Now!</h1></div>
                  <div className="w-2/3 hidden lg:flex ">
                    <p className="text-slate-200">
                      From elegant soirées to lively gatherings, we curate diverse events for every occasion, guaranteeing a memorable experience for all guests.
                    </p>
                  </div>
                </div>
                {/* using tailwind  */}

                <Link to="/event">
                  <button
                    type="button"
                    className="mt-14 text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-lg px-7 py-2 text-center  mb-2"
                  >
                    See More
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>
        {/* Thumbnails */}
        <div className="thumbnail">
          {[img1, img2, img3, img4].map((img, index) => (
            <div
              key={index}
              className={`item ${currentSlide === index
                ? "border-4 rounded-3xl border-rose-500"
                : ""
                }`}
              onClick={() => setCurrentSlide(index)}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} />

            </div>
          ))}
        </div>
        {/* Arrows */}
        <div className="arrows">
          <button id="prev" onClick={prevSlide}>
            {"<"}
          </button>
          <button id="next" onClick={nextSlide}>
            {">"}
          </button>
        </div>
        <div className="time"></div>
      </div>
    </div>
  ); // Add the closing curly brace here
};

export default MagicBanner;
