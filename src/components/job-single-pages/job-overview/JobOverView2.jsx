import { format, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths } from "date-fns";

const JobOverView2 = ({ job }) => {
  const getTimeSincePosted = (timestamp) => {
    if (!timestamp) return "Unknown";

    let postedDate;

    if (timestamp.seconds !== undefined) {
      postedDate = timestamp.toDate();
    } else {
      postedDate = new Date(timestamp);
    }

    const now = new Date();
    const minutesAgo = differenceInMinutes(now, postedDate);
    const hoursAgo = differenceInHours(now, postedDate);
    const daysAgo = differenceInDays(now, postedDate);
    const monthsAgo = differenceInMonths(now, postedDate);

    if (minutesAgo < 60) {
      return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
    } else if (daysAgo < 30) {
      return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    } else {
      return `over ${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not Provided";
    const date = new Date(dateString);
    return format(date, "do MMMM yyyy"); // "4th July 2025"
  };

  const formatCurrency = (currency, amount) => {
    if (!currency || !amount) return "Not Provided";

    // Ensure currency is a string before calling match()
    const currencyStr = String(currency);

    const match = currencyStr.match(/^(.+)\s\((.+)\)$/);
    if (match) {
      const symbol = match[1];  // "£"
      const abbreviation = match[2]; // "GBP"
      return `${symbol}${amount} (${abbreviation})`;
    }

    return `${currencyStr}${amount}`; // Fallback if the format is unexpected
  };


  return (
    <ul>
      <li>
        <i className="icon icon-calendar"></i>
        <h5>Date Posted:</h5>
        <span>{getTimeSincePosted(job.timestamp)}</span>
      </li>
      <li>
        <i className="icon icon-expiry"></i>
        <h5>Expiration date:</h5>
        <span>{formatDate(job.applicationDeadlineDate)}</span>
      </li>
      <li>
        <i className="icon icon-location"></i>
        <h5>Location:</h5>
        <span>{job.city}, {job.country}</span>
      </li>
      <li>
        <i className="icon icon-rate"></i>
        <h5>Rate:</h5>
        <span>{formatCurrency(job.currency, job.offeredSalary)} {job.rates}</span>
      </li>
    </ul>
  );
};

export default JobOverView2;
