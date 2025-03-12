import { useState, useEffect } from "react";
import { db, auth } from "@/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const Experiences = () => {
  const [workList, setWorkList] = useState([]);
  const [newWork, setNewWork] = useState({
    title: "",
    company: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  useEffect(() => {
    const fetchWork = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const querySnapshot = await getDocs(collection(db, `users/${user.uid}/work_experience`));
      const workData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkList(workData);
    };

    fetchWork();
  }, []);

  const addWork = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/work_experience`), newWork);
      setWorkList([...workList, { id: docRef.id, ...newWork }]);
      setNewWork({ title: "", company: "", startYear: "", endYear: "", description: "" });

      // Close the modal using Bootstrap's JS
      window.bootstrap.Modal.getInstance(document.getElementById("workModal")).hide();
    } catch (error) {
      console.error("Error adding work experience:", error);
    }
  };

  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work & Experience</h4>
        <button
          className="add-info-btn"
          data-bs-toggle="modal"
          data-bs-target="#workModal"
        >
          <span className="icon flaticon-plus"></span> Add Work
        </button>
      </div>


      <div className="modal fade" id="workModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <button type="button" className="closed-modal" data-bs-dismiss="modal"></button>
            <div className="modal-body">
              <h3>Add Work Experience</h3>
              <form onSubmit={addWork}>
                <div className="row">
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Job Title"
                      value={newWork.title}
                      onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      value={newWork.company}
                      onChange={(e) => setNewWork({ ...newWork, company: e.target.value })}
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
                      value={newWork.startYear}
                      onChange={(e) => setNewWork({ ...newWork, startYear: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group col-lg-6 col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="End Year"
                      value={newWork.endYear}
                      onChange={(e) => setNewWork({ ...newWork, endYear: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-12">
                    <textarea
                      className="form-control"
                      placeholder="Enter some details about the job"
                      value={newWork.description}
                      onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
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
      </div>
    </div>
  );
};

export default Experiences;
