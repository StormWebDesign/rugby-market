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
        . All Right Reserved.
      </p>
    </div>
  );
};

export default CopyrightFooter;
