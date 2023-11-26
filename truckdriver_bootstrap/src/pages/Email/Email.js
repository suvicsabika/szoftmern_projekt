import React, { useState } from 'react';
import axios from 'axios';
import { MyNavbarMain } from '../../components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EmailPage = () => {
  const [emailData, setEmailData] = useState({
    emailAddress: '',
    subject: '',
    body: '',
  });

  const handleInputChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState(null);

  const sendEmail = async () => {
    try {
      const { subject, body } = emailData;
      const response = await axios.post(`http://localhost:8081/email/id:${emailData.emailAddress}subject:${subject}body:${body}`, {

      });

      setAlert({ type: 'success', message: 'Email sent successfully!' });
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error sending email. Please try again.' });
    }
  };

  return (
    <div className="container-fluid">
    <MyNavbarMain />
    <h1>Email Page</h1>
    <form>
    <div>
        <label htmlFor="emailAddress">Email address:</label>
        <input
          type="text"
          id="emailAddress"
          className="form-control"
          name="emailAddress"
          value={emailData.emailAddress}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          className="form-control"
          name="subject"
          value={emailData.subject}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          className="form-control"
          value={emailData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="button" onClick={sendEmail} className="btn btn-primary">
        Send Email
      </button>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

    </form>
  </div>
);
};


export default EmailPage;
