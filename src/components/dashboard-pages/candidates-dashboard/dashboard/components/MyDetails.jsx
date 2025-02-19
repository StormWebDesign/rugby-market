import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWeightScale } from '@fortawesome/free-solid-svg-icons'

const MyDetails = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    console.error("No user is logged in.");
                    setLoading(false);
                    return;
                }

                // Get user details from Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.error("User data not found in Firestore.");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <p>Loading your details...</p>;
    }

    if (!userData) {
        return <p>No user data available.</p>;
    }

    return (
        <ul>
            <li>
                <strong>{userData.firstName} {userData.lastName}</strong>
            </li>
            <li>
                <FontAwesomeIcon icon={faWeightScale} />
                <span> Height:</span> <strong>{userData.heightFt}ft {userData.heightInch}in</strong>
            </li>
            <li>
                <FontAwesomeIcon icon={faWeightScale} />
                <span> Weight:</span> <strong>{userData.weight} kg</strong>
            </li>
            <li>
                <span>Current Club:</span><br></br><strong>{userData.currentClub || "Not specified"}</strong>
            </li>
            <li>
                <span>Playing Positions:</span><br></br><strong>{userData.positions ? userData.positions.join(", ") : "Not specified"}</strong>
            </li>
        </ul>
    );
};

export default MyDetails;
