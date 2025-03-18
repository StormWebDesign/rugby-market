import React from "react";
import Social from "../social/Social";

const CompanyInfo = ({ company }) => {
  return (

      <ul className="company-info">
        <li>
          Rugby Played: <span>{company?.rugbyType || "Not Provided"}</span>
        </li>
        <li>
          Founded in: <span>{company?.establishedSince ? new Date(company.establishedSince).getFullYear() : "Not Provided"}</span>
        </li>
        <li>
          Phone: <span>{company?.phone || "Not Provided"}</span>
        </li>
        <li>
          Email: <span>{company?.email || "Not Provided"}</span>
        </li>
        <li>
          Location: <span>{company?.city || "Not Provided"}, {company?.country || "Not Provided"}</span>
        </li>
        <li>
          Social media: <Social company={company} />
        </li>
      </ul>
  );
};

export default CompanyInfo;
