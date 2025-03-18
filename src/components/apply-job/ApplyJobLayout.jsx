const ApplyJobLayout = ({ userType, children }) => {
  return (
    <>
      <span className="header-span"></span>
      <LoginPopup />
      {userType === "Player" ? <DashboardCandidatesHeader /> : <DefaulHeader />}
      <MobileMenu />
      {children}
      <FooterDefault />
    </>
  );
};

export default ApplyJobLayout;
