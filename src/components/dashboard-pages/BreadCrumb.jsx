import PropTypes from "prop-types";

const BreadCrumb = ({ title = "" }) => {
  return (
    <div className="mobile-only-breadcrumb">
      <div className="upper-title-box">
        <h1>{title}</h1>
        {/* <div className="text">Ready to jump back in?</div> */}
      </div>
    </div>
  );
};

BreadCrumb.propTypes = {
  title: PropTypes.string,
};

export default BreadCrumb;
