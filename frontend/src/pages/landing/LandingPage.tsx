import React from "react";
import { Hero } from "../../components/landing/Hero";
import { Features } from "../../components/landing/Features";
import { Testimonials } from "../../components/landing/Testimonials";
import { CallToAction } from "../../components/landing/CallToAction";
import Footer from "@/components/ui/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </div>
        < Footer/>
    </div>
  );
};

export default LandingPage;
