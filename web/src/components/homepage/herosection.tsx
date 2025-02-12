"use client";
// components/HeroSection.tsx
import React from "react";
import Welcome from "../welcome";
// import ListCategories from "../../components/listcategory";

const HeroSection: React.FC = () => {
  return (
    <section>
      <div className="p-12">
        <Welcome />
      </div>
    </section>
  );
};

export default HeroSection;
