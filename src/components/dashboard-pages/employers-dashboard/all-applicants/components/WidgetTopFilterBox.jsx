const WidgetTopFilterBox = ({ selectedJob, setSelectedJob }) => {
  return (
    <div className="chosen-outer">
      {/* Job Title Filter */}
      <select
        className="chosen-single form-select chosen-container"
        value={selectedJob}
        onChange={(e) => setSelectedJob(e.target.value)}
      >
        <option value="All Jobs">All Jobs</option>
        <option value="Hooker">Hooker</option>
        <option value="Fly-Half">Fly-Half</option>
      </select>

      {/* Existing Filters */}
      <select className="chosen-single form-select chosen-container">
        <option>Select Jobs</option>
        <option>Last 12 Months</option>
        <option>Last 16 Months</option>
        <option>Last 24 Months</option>
        <option>Last 5 years</option>
      </select>

      <select className="chosen-single form-select chosen-container">
        <option>All Status</option>
        <option>Last 12 Months</option>
        <option>Last 16 Months</option>
        <option>Last 24 Months</option>
        <option>Last 5 years</option>
      </select>
    </div>
  );
};

export default WidgetTopFilterBox;
