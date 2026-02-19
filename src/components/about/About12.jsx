
import { Link } from "react-router-dom";

const About12 = () => {
  return (
    <>
      {/* <!-- About Section --> */}
      <section className="about-section -type-2 layout-pt-120 layout-pb-60">
        <div className="auto-container">
          <div className="row justify-content-between align-items-center">
            <div className="image-group image-column -no-margin col-xl-6 col-lg-6 col-md-12 col-sm-12 wow fadeInRight">
              <div className="image-box -type-1">
                <figure className="main-image" data-aos="fade-left">
                  <img

                    src="/images/hero/homepage/IMG-20250228-WA0006-resized.jpg"
                    alt="image"
                    className="portrait-circle"
                  />
                </figure>
              </div>
            </div>
            {/* End .col */}

            <div className="content-column mb-0 col-xl-5 col-lg-6 col-md-12 col-sm-12">
              <div data-aos="fade-right">
                <div className="sec-title mb-0">
                  <h2 className="fw-700">
                    <span className="text-orange">Connecting</span>
                    <br />  Players and Clubs Worldwide
                  </h2>
                  <div className="mt-30 lead-text">
                    Whether you&apos;re a <span className="fw-700">rugby player looking for new opportunities</span> or a <span className="fw-700">club seeking top talent</span>, The Rugby Transfer Market is your go-to platform.
                    Create a profile, showcase your skills, post or apply for positions, and take your rugby career to the next level.
                  </div>
                  <div className="mt-30 lead-text">
                    Create a profile, showcase your skills, post or apply for positions, and take your rugby career to the next level.
                  </div>
                  <div className="mt-30 lead-text">
                    <span className="fw-700">
                    For Players</span>: Build your online rugby CV and apply directly to club vacancies.
                  </div>
                  <div className="lead-text">
                    <span className="fw-700">
                    For Clubs</span>: Post jobs, scout talent, and find the perfect match for your squad.
                  </div>
                  <h2 className="mt-30 fw-700">
                    Join today – it’s free to get started!
                  </h2>
                </div>
                <Link
                  to="/job-list-v12"
                  className="theme-btn -blue-outline mt-30"
                >
                  Get Started
                </Link>
              </div>
            </div>
            {/* End  {/* <!-- Content Column --> */}
          </div>
        </div>
      </section>
      {/* <!-- End About Section --> */}
    </>
  );
};

export default About12;
