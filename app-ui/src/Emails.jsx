import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";

import "./res/email.css";
import "./res/helper.css";

export default function Emails() {
  const [emails, setEmails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response_data = await fetch("/get/emails/").then((res) =>
        res.json()
      );
      return response_data;
    };

    fetchData()
      .then((res) => {
        setEmails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="main-wrapper">
        <SideBar />

        <div className="main emails-main">
          <h3>List of Emails</h3>
          <div>
            {Object.keys(emails).length > 0 ? (
              Object.keys(emails)
                .map((val, index) => {
                  return <EmailBox data={emails[val]} key={index} />;
                })
                .reverse()
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

function EmailBox(props) {
  const navigate = useNavigate();

  const toDetails = () => {
    navigate("/email/details", { state: props.data });
  };

  return (
    <a className="email-box-wrapper" onClick={toDetails}>
      <div className="row-wrapper">
        <div className="div1">
          <p>
            <b>From:</b>
          </p>
          <p>{props.data.sender}</p>
        </div>

        <div className="div2">
          <p>
            <b>To:</b>
          </p>
          <p>{props.data.reciever}</p>
        </div>

        <div className="div3">
          <p>
            <b>Subject:</b>
          </p>
          <p>{props.data.subject}</p>
        </div>

        <div className="div4">
          <p>
            <b>Email Text:</b>
          </p>
          <p>{props.data.email_text}</p>
        </div>
      </div>
    </a>
  );
}
