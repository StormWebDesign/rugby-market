import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const querySnapshot = await getDocs(collection(db, `users/${user.uid}/education`));
      const educationData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEducationList(educationData);
    };

    fetchEducation();
  }, []);

  const addEducation = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/education`), newEducation);
      setEducationList([...educationList, { id: docRef.id, ...newEducation }]);
      setNewEducation({ degree: "", school: "", startYear: "", endYear: "", description: "" });

      // Close the modal using Bootstrap's JS
      window.bootstrap.Modal.getInstance(document.getElementById("educationModal")).hide();
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        <button
          className="add-info-btn"
          data-bs-toggle="modal"
          data-bs-target="#educationModal"
        >
          <span className="icon flaticon-plus"></span> Add Education
        </button>
      </div>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="educationModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <button type="button" className="closed-modal" data-bs-dismiss="modal"></button>
            <div className="modal-body">
              <h3>Add Education</h3>
              <form onSubmit={addEducation}>
                <div className="row">
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Degree"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="School"
                      value={newEducation.school}
                      onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Start Year"
                      value={newEducation.startYear}
                      onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="End Year"
                      value={newEducation.endYear}
                      onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={newEducation.description}
                  onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                ></textarea>
                </div>
              </div>
                <button type="submit" className="theme-btn btn-style-one">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div >

      {
        educationList.map((edu) => (
          <div className="resume-block" key={edu.id}>
            <div className="inner">
              <span className="name">{edu.degree.charAt(0)}</span>
              <div className="title-box">
                <div className="info-box">
                  <h3>{edu.degree}</h3>
                  <span>{edu.school}</span>
                </div>
                <div className="edit-box">
                  <span className="year">{edu.startYear} - {edu.endYear}</span>
                  <button onClick={() => deleteDoc(doc(db, `users/${auth.currentUser.uid}/education`, edu.id))}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
              <div className="text">{edu.description}</div>
            </div>
          </div>
        ))
      }
    </div >
  );
};

export default Education;
