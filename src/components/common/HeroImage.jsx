// src/components/common/HeroImage.jsx
import { useEffect, useState } from "react";
import heroImages from "@/data/heroImages";

const HeroImage = () => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setRandomImage(heroImages[randomIndex]);
  }, []);

  if (!randomImage) return null;

  return (
    // <div className="image-outer" data-aos="fade-in" data-aos-delay="300">
    <div className="image-outer">
      <figure className="image">
        <img
          src={randomImage.src}
          alt={randomImage.alt || "hero banner"}
          className="shape"
        />
      </figure>
    </div>
  );
};

export default HeroImage;
