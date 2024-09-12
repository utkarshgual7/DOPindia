import React, { useState, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Section from "./Section";
import { curve } from "../assets";
import { getImageUrl } from "../utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = React.lazy(() => import("./Services"));
const HowToBook = React.lazy(() => import("./HowToBook"));

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    navigate(`/forum?search=${encodeURIComponent(searchTerm)}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Increased autoplay speed
    lazyLoad: "ondemand", // Lazy load slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Section
        className="pt-[12rem] -mt-[4.5rem] max-lg:mt-[-50px]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <div className="container relative">
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
            <h1 className="h1 mb-6">
              {t("hero.title1", "Repair,")}{" "}
              <span className="text-red-400">
                {t("hero.title2", "upgrade")}
              </span>
              <br />
              {t("hero.title3", "and experience a new")}
              <br />
              {t("hero.title4", "level of")}&nbsp;
              <span className="inline-block relative">
                <span className="text-red-400">
                  {t("hero.title5", "performance")}
                </span>
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  width={624}
                  height={28}
                  alt="Curve"
                  loading="eager"
                />
              </span>
            </h1>

            <div className="flex justify-center mt-8">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
                  placeholder={t("hero.placeholder", {
                    defaultValue: "Search for services or topics...",
                  })}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-2 mr-4 text-red-400"
                  aria-label="Search button"
                  onClick={handleSearch}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex mt-8 lg:mt-3 justify-center ">
              <Link
                to="/bookservice"
                className="inline-block py-3 px-6 bg-red-400 text-white font-semibold rounded-full shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-75 transition duration-300"
              >
                {t("hero.bookService", {
                  defaultValue: "Book a Service",
                })}
              </Link>
            </div>
          </div>

          <div className="flex mx-4 pb-1">
            <div className="w-full">
              <Slider {...settings}>
                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/dell.png")}
                    alt="Dell Icon"
                    className="w-30 h-20"
                    loading="lazy"
                  />
                </div>
                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/hp.png")}
                    alt="HP Icon"
                    className="w-30 h-20"
                    loading="lazy"
                  />
                </div>
                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/acer.png")}
                    alt="Acer Icon"
                    className="w-40 h-30"
                    loading="lazy"
                  />
                </div>

                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/gigabyte.png")}
                    alt="Gigabyte Icon"
                    className="w-30 h-20"
                    loading="lazy"
                  />
                </div>
                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/asus.webp")}
                    alt="Asus Icon"
                    className="w-40 h-30"
                    loading="lazy"
                  />
                </div>
                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/msi.webp")}
                    alt="MSI Icon"
                    className="w-40 h-30"
                    loading="lazy"
                  />
                </div>
                <div className="icon animate-pulse">
                  <img
                    src={getImageUrl("brands/apple.png")}
                    alt="Huawei Icon"
                    className="w-30 h-20"
                    loading="lazy"
                  />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </Section>
      <Suspense fallback={<div>Loading Services...</div>}>
        <Services />
      </Suspense>
      <Suspense fallback={<div>Loading How to Book...</div>}>
        <HowToBook />
      </Suspense>
    </>
  );
}

export default Hero;
