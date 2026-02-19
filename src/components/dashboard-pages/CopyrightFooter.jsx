import { version } from "@/data/version";

const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} Rugby Transfer Market by {" "}
        <a
          href="https://storm.agency"
          target="_blank"
          rel="noopener noreferrer"
        >
          Storm
        </a>
        . All Right Reserved. | v{version[0].split(" - ")[0]}
      </p>
    </div>
  );
};

export default CopyrightFooter;
