import backgroundImage from "../../public/background-img.jpg";
import React, { useRef } from "react";

function LandingPage() {
  const carouselRef = useRef(null); // ✅ useRef should be inside the component

  const moveToItem = (number, event = null) => {
    if (event) event.preventDefault(); // Only call preventDefault if event exists

    const carousel = carouselRef.current;
    if (carousel) {
      const item = document.getElementById(`item${number}`);
      if (item) {
        const carouselRect = carousel.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const offset =
          itemRect.left -
          carouselRect.left -
          carouselRect.width / 2 +
          itemRect.width / 2;

        carousel.scrollBy({ left: offset, behavior: "smooth" });
      }
    }
  };

  const moveLeft = (event) => {
    event.preventDefault();
    const carousel = carouselRef.current;
    if (carousel) {
      const currentScroll = carousel.scrollLeft;
      const itemWidth = carousel
        .querySelector(".carousel-item")
        .getBoundingClientRect().width;
      carousel.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const moveCarousel = (direction, event = null) => {
    if (event) event.preventDefault(); // Prevent default if event exists

    const carousel = carouselRef.current;
    if (carousel) {
      const item = carousel.querySelector(".carousel-item"); // Get the first item to determine width
      if (item) {
        const itemWidth = item.getBoundingClientRect().width;
        carousel.scrollBy({ left: direction * itemWidth, behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <div
        className="box-border bg-opacity-90 bg-cover bg-center bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex justify-center h-screen">
          <div className="flex flex-col justify-center items-center">
            <div className="text-8xl font-bold text-black">
              P
              <span className="bg-gradient-to-r from-[#ff5202] to-[#ff8f5c] bg-clip-text text-transparent">
                o
              </span>
              seid
              <span className="bg-gradient-to-r from-[#ff5202] to-[#ff8f5c] bg-clip-text text-transparent">
                o
              </span>
              n
            </div>
            <div className="text-4xl font-bold text-black">
              Florida's Flash Flood Risk Management Platform
            </div>
            <br />
            <br />

            <div className="relative flex items-center justify-center w-full">
              {/* Left Button */}
              <button
                onClick={(e) => moveCarousel(-1, e)}
                className="absolute left-0 z-10 btn btn-circle bg-black shadow-lg"
              >
                ❮
              </button>

              {/* Carousel */}
              <div
                ref={carouselRef}
                className="carousel carousel-center bg-transparent rounded-box max-w-2xl space-x-8 overflow-x-auto snap-x scroll-smooth"
              >
                <div
                  id="item1"
                  className="carousel-item snap-center m-5 card h-90 w-96"
                >
                  <div className="card-body bg-[#ff915e] p-0 rounded-2xl shadow-lg">
                    <div className="card-title bg-gradient-to-b from-[#ff5202] to-[#ff8f5c] p-5 w-full flex justify-center rounded-t-2xl">
                      <h2>Florida 2024 Huricane Season</h2>
                    </div>
                    <p className="m-10 text-xl">
                      In 2024, record-breaking floods in Florida forced over 1
                      million evacuations, submerged thousands of homes, and
                      left 500,000 people homeless.
                    </p>
                  </div>
                </div>
                <div
                  id="item2"
                  className="carousel-item snap-center m-5 card h-90 w-96"
                >
                  <div className="card-body bg-[#ff915e] p-0 rounded-2xl shadow-lg">
                    <div className="card-title bg-gradient-to-b from-[#ff5202] to-[#ff8f5c] p-5 w-full flex justify-center rounded-t-2xl">
                      <h2>Card Title</h2>
                    </div>
                    <p className="m-10">
                      A card component has a figure, a body part, and inside
                      body there are title and actions parts.
                    </p>
                  </div>
                </div>
                <div
                  id="item3"
                  className="carousel-item snap-center m-5 card h-90 w-96"
                >
                  <div className="card-body bg-[#ff915e] p-0 rounded-2xl shadow-lg">
                    <div className="card-title bg-gradient-to-b from-[#ff5202] to-[#ff8f5c] p-5 w-full flex justify-center rounded-t-2xl">
                      <h2>Card Title</h2>
                    </div>
                    <p className="m-10">
                      A card component has a figure, a body part, and inside
                      body there are title and actions parts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Button */}
              <button
                onClick={(e) => moveCarousel(1, e)}
                className="absolute right-0 z-10 btn btn-circle bg-black shadow-lg"
              >
                ❯
              </button>
            </div>
            {/* Navigation buttons */}
            <div className="flex w-full justify-center gap-2 py-2">
              <button onClick={(e) => moveToItem(1, e)} className="btn btn-xs">
                1
              </button>
              <button onClick={(e) => moveToItem(2, e)} className="btn btn-xs">
                2
              </button>
              <button onClick={(e) => moveToItem(3, e)} className="btn btn-xs">
                3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
