

import CandidatesList from "@/components/candidates-listing-pages/candidates-list-v5";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Candidates List V5 || Superio - Job Borad ReactJs Template',
  description:
    'Superio - Job Borad ReactJs Template',
  
}



const CandidateListPage5 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      
      <CandidatesList />
    </>
  );
};

export default CandidateListPage5
