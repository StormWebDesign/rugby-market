import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Slider from "react-slick";

const Partner = () => {
  const [sliderGallery, setSliderGallery] = useState([]);

  useEffect(() => {
    const fetchClubLogos = async () => {
      try {
        // Reference to the 'users' collection
        const usersRef = collection(db, "users");
        // Query for clubs with a non-null club_logoImageURL
        const q = query(
          usersRef,
          where("userType", "==", "Club"),
          where("club_logoImageURL", "!=", null)
        );

        // Fetch documents
        const querySnapshot = await getDocs(q);
        const logos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          link: "#", // You can replace this with dynamic links if required
          imgURL: doc.data().club_logoImageURL,
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
    autoplay: false,
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
    <>
      <Slider {...settings} arrows={false}>
        {sliderGallery.map((item) => (
          <li className="slide-item" key={item.id}>
            <figure className="image-box">
              <a href={item.link}>
                <img src={item.imgURL} alt="club logo" />
              </a>
            </figure>
          </li>
        ))}
      </Slider>
    </>
  );
};

export default Partner;
