import { useEffect, useState } from "react";
import { db } from "@/firebase"; // Adjust path to your firebase.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { format } from "date-fns"; // Import date-fns for formatting
import CountUp from 'react-countup';
import SearchForm from "../../common/job-search/SearchForm";
import PopularSearch from "../PopularSearch";
import Partner from "../../common/partner/Partner";
import HeroImage from "@/components/common/HeroImage";

const Index = () => {
  const [jobCount, setJobCount] = useState(0);
  const [clubCount, setClubCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch job count
        const today = format(new Date(), "yyyy-MM-dd");
        const jobsRef = collection(db, "jobs");
        const jobQuery = query(jobsRef, where("applicationDeadlineDate", ">", today));
        const jobSnapshot = await getDocs(jobQuery);
        setJobCount(jobSnapshot.size);

        // Fetch user counts
        const usersRef = collection(db, "users");
        const clubQuery = query(usersRef, where("userType", "==", "Club"));
        const playerQuery = query(usersRef, where("userType", "==", "Player"));

        const [clubSnapshot, playerSnapshot] = await Promise.all([
          getDocs(clubQuery),
          getDocs(playerQuery),
        ]);

        setClubCount(clubSnapshot.size);
        setPlayerCount(playerSnapshot.size);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="banner-section-seven">
      <HeroImage />
      {/* End image-outer */}

      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div className="inner-column">
              <div
                className="title-box"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <h3>
                  There Are <span className="colored"><CountUp end={jobCount} /></span> <br />{" "}
                  Rugby jobs available!
                </h3>

                <h4>
                  We have <span className="colored"><CountUp end={clubCount} /></span> Clubs and{" "}
                  <span className="colored"><CountUp end={playerCount} /></span> Players signed up!
                </h4>
                <div className="text">
                  Find Positions, Jobs & Career Opportunities
                </div>
              </div>

              {/* Job Search Form */}
              <div
                className="job-search-form"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <SearchForm />
              </div>
              {/* End Job Search Form */}

              {/* Popular Search */}
              <PopularSearch />
              {/* End Popular Search */}

              <div
                className="clients-section-two"
                data-aos="fade-up"
                data-aos-delay="1300"
              >
                <Partner />
              </div>
              {/* End Partner */}
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default Index;
