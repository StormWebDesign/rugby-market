import MobileMenu from "../../../header/MobileMenu";
import DashboardHeader from "../../../header/DashboardHeader";
import LoginPopup from "../../../common/form/login/LoginPopup";
import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import EditJobForm from "./components/EditJobForm";
import MenuToggler from "../../MenuToggler";
import PropTypes from "prop-types";

const EditJob = ({ jobId }) => {
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <LoginPopup />
      <DashboardHeader />
      <MobileMenu />
      <DashboardEmployerSidebar />

      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Edit Job" />
          <MenuToggler />

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="widget-title">
                  <h4>Edit Job</h4>
                </div>
                <div className="widget-content">
                  <EditJobForm jobId={jobId} />
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

EditJob.propTypes = {
  jobId: PropTypes.string,
};

export default EditJob;
