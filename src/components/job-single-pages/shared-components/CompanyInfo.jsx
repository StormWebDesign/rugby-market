import React from "react";
import Social from "../social/Social";

const CompanyInfo = ({ company }) => {
  return (
    <ul className="company-info">
      <li>
        Club Name: <span>{company?.clubName || "Not Provided"}</span>
      </li>
      <li>
        Primary industry: <span>{company?.industry || "Not Provided"}</span>
      </li>
      <li>
        Company size: <span>{company?.size || "Not Provided"}</span>
      </li>
      <li>
        Founded in: <span>{company?.establishedSince || "Not Provided"}</span>
      </li>
      <li>
        Phone: <span>{company?.phone || "Not Provided"}</span>
      </li>
      <li>
        Email: <span>{company?.email || "Not Provided"}</span>
      </li>
      <li>
        Location: <span>{company?.location || "Not Provided"}</span>
      </li>
      <li>
        Social media: <Social />
      </li>
    </ul>
  );
};

export default CompanyInfo;
