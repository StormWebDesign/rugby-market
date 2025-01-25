import { useState } from "react";
import { db } from "@/firebase";
import { collection, addDoc } from 'firebase/firestore';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Make sure required fields are filled
    if (!formData.name || !formData.email ||  !formData.phone || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Send the form data to Firestore "contact" collection
      const docRef = await addDoc(collection(db, 'contact'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        phone: formData.phone,
        message: formData.message,
        timestamp: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
      });
      setError('');
      alert('Message sent successfully!');
    } catch (e) {
      setLoading(false);
      setError('Error sending message: ' + e.message);
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-12 col-md-12 col-sm-12">
          <div className="response">{error && <p>{error}</p>}</div>
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Your Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            className="email"
            placeholder="Your Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            className="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-6 col-md-12 col-sm-12 form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            className="phone"
            placeholder="Phone Number*"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Your Message</label>
          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
