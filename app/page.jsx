"use client"

import FeatureDishes from "@/components/FeatureDishes";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Offers from "@/components/Offers";
import OurStory from "@/components/OurStory";

export default function Home() {
  return (
    <div className="home-container">
    {/* Hero Section */}
    <Hero/>
    {/* Feature Section */}
    <FeatureDishes/>
    {/* Store Section */}
    <OurStory/>
    {/* Offers Section */}
    <Offers/>
    {/* Gallery Section */}
    <Gallery/>
    </div>
  );
}
