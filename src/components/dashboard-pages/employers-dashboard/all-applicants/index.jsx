import { useState } from "react";
import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import WidgetContentBox from "./components/WidgetContentBox";
import WidgetTopFilterBox from "./components/WidgetTopFilterBox";
import MenuToggler from "../../MenuToggler";

const Index = () => {
  const [selectedJob, setSelectedJob] = useState("All Jobs"); // Manage job filter state

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardHeader />
      <MobileMenu />
      <DashboardEmployerSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="All Applicants!" />

          <MenuToggler />

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Applicant</h4>
                    {/* Pass selectedJob state to WidgetTopFilterBox */}
                    <WidgetTopFilterBox selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
                  </div>

                  {/* Pass selectedJob to WidgetContentBox */}
                  <WidgetContentBox selectedJob={selectedJob} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CopyrightFooter />
    </div>
  );
};

export default Index;
