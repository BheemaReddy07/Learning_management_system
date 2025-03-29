import Banner from "@/components/Banner";
import Courses from "@/components/Courses";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import React from "react";

const Home = () => {
  return (
    <div>
      <Header />
      {/* <HeroSection /> */}
      <Courses />
      <Banner />
    </div>
  );
};

export default Home;
