import { useEffect, useState } from "react";
import { db, auth } from "@/firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner"; 

const WidgetContentBox = ({ selectedJob }) => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        if (!auth.currentUser) {
          console.warn("⚠️ No authenticated user found.");
          return;
        }

        const clubId = auth.currentUser.uid;
        console.log("✅ Logged-in Club UID:", clubId);

        let fetchedCandidates = [];

        // Step 1: Get jobs posted by the club
        const jobsQuery = query(collection(db, "jobs"), where("userId", "==", clubId));
        const jobSnapshots = await getDocs(jobsQuery);
        const jobIds = jobSnapshots.docs.map(doc => doc.id);

        if (jobIds.length === 0) {
          console.warn("⚠️ No jobs found for this club.");
          setCandidatesData([]);
          setLoading(false);
          return;
        }

        // Step 2: Fetch applications for these jobs
        const applicationsQuery = query(collection(db, "applications"), where("jobId", "in", jobIds));
        const applicationsSnapshots = await getDocs(applicationsQuery);
        const applications = applicationsSnapshots.docs.map(doc => doc.data());

        if (applications.length === 0) {
          console.warn("⚠️ No applications found.");
          setCandidatesData([]);
          setLoading(false);
          return;
        }

        // Step 3: Fetch Players Using Firestore Document IDs
        const playerIds = [...new Set(applications.map(app => app.playerId))];
        const playerDocs = await Promise.all(
          playerIds.map(async (playerId) => {
            const playerRef = doc(db, "users", playerId);
            const playerSnap = await getDoc(playerRef);
            return playerSnap.exists() ? { id: playerId, ...playerSnap.data() } : null;
          })
        );

        const players = playerDocs.filter(player => player !== null);

        // Step 4: Match Applications with Player Data
        fetchedCandidates = applications.map(application => {
          const player = players.find(p => p.id === application.playerId);
          return player
            ? {
                id: application.playerId,
                jobTitle: application.jobTitle,
                avatar: player.fullImage || "/images/default-user.png",
                name: player.fullName || "Unknown Player",
                designation: application.jobTitle,
                location: player.city || "Unknown",
                hourlyRate: player.expectedSalary || "N/A",
                tags: player.positions || [],
              }
            : null;
        }).filter(candidate => candidate !== null);

        setCandidatesData(fetchedCandidates);
      } catch (err) {
        console.error("❌ Error fetching applicants:", err);
        setError("Error fetching applicants. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const filteredCandidates = selectedJob === "All Jobs"
    ? candidatesData
    : candidatesData.filter(candidate => candidate.jobTitle === selectedJob);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (filteredCandidates.length === 0) return <p>No applicants found.</p>;

  return (
    <div className="widget-content">
      <Tabs>
        <div className="aplicants-upper-bar">
          <h6>{selectedJob === "All Jobs" ? "All Applicants" : selectedJob}</h6>
        </div>
        <div className="tabs-content">
          <TabPanel>
            <div className="row">
              {filteredCandidates.map(candidate => (
                <div key={candidate.id} className="candidate-block-three col-lg-6">
                  <div className="inner-box">
                    <h4 className="name">
                      <Link to={`/candidates-single-v1/${candidate.id}`}>{candidate.name}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default WidgetContentBox;
