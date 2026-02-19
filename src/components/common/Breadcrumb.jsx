import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Breadcrumb = ({ title = "", meta = "" }) => {
  return (
    <section className="page-title">
      <div className="auto-container">
        <div className="title-outer">
          <h1>{title}</h1>
          <ul className="page-breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{meta}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

Breadcrumb.propTypes = {
  title: PropTypes.string,
  meta: PropTypes.string,
};

export default Breadcrumb;
