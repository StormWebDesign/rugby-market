import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Slider from "react-slick";

const Partner = () => {
  const [sliderGallery, setSliderGallery] = useState([]);

  useEffect(() => {
    const fetchClubLogos = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(
          usersRef,
          where("userType", "==", "Club"),
          where("club_logoImageURL", "!=", null)
        );

        const querySnapshot = await getDocs(q);
        const logos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          link: "#", // Placeholder for future club profiles
          imgURL: doc.data().club_logoImageURL,
          clubName: doc.data().clubName || "Rugby Club",
        }));

        setSliderGallery(logos);
      } catch (error) {
        console.error("Error fetching club logos:", error);
      }
    };

    fetchClubLogos();
  }, []);

  const settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    infinite: false, // Prevent react-slick from duplicating slides
    speed: 1200,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 6 } },
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 0, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="clients-section-two">
      <Slider {...settings} arrows={false}>
        {sliderGallery.map((item) => (
          <div className="slide-item" key={item.id}>
            <figure className="image-box">
              <a href={item.link}>
                <img src={item.imgURL} alt={item.clubName} />
              </a>
            </figure>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partner;
