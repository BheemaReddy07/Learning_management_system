import React from "react";

const Header = () => {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-teal-500 to-blue-900 rounded-md px-6 mt-24 md:px-10 lg:px-20"
    >
      {/*----------- Left Side -----------*/}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Learn from <br /> Expert Instructors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-small font-light">
          <img className="w-28" src="headerImg.png" alt="Students Group" />
          <p>
            Access a wide range of courses, interact with top instructors,{" "}
            <br className="hidden sm:block" />
            and enhance your skills at your own pace.
          </p>
        </div>
        <a
          href="#courses"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Browse Courses{" "}
          <img className="w-3" src="arrow_icon.svg" alt="Arrow Icon" />
        </a>
      </div>

      {/*----------- Right Side -----------*/}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src="headerImg.png"
          alt="LMS Banner"
        />
      </div>
    </div>
  );
};

export default Header;
