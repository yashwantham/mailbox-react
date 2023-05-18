// import { useContext } from "react";
// import { NavLink, useParams } from "react-router-dom";
// import { Header } from "../components/Header";

// import { MailContext } from "../contexts/MailProvider";

// export function MailDetail() {
//   const { dispatch } = useContext(MailContext);

//   const { mailId } = useParams();

//   const { inbox } = useContext(MailContext);

//   const selectedMail = inbox.find(({ mId }) => mId == mailId);

//   const handleStarClick = (id) => {
//     dispatch({ type: "star-unstar", payload: id });
//   };

//   const handleReadClick = (id) => {
//     dispatch({ type: "read-unread", payload: id });
//   };

//   return (
//     <>
//       <div className="whole-component">
//         <div>
//           <Header />
//         </div>
//         <div
//           className="mails-display"
//           style={{
//             textAlign: "left",
//             border: "2px solid",
//             borderRadius: "5px",
//             padding: "15px"
//           }}
//         >
//           <button
//             style={{
//               backgroundColor: selectedMail.isStarred ? "yellow" : "lightgray"
//             }}
//             onClick={() => handleStarClick(selectedMail.mId)}
//           >
//             {selectedMail.isStarred ? "Unstar" : "Star"}
//           </button>
//           <h1>{selectedMail.subject}</h1>
//           <p>{selectedMail.content}</p>
//           <div>
//             <button>Delete</button>
//             <button onClick={() => handleReadClick(selectedMail.mId)}>
//               {selectedMail.unread ? "Mark as Read" : "Mark as Unread"}
//             </button>
//             <button>Report Spam</button>
//           </div>
// <NavLink to="/" className="back-to-inbox">
//   Back to inbox
// </NavLink>
//         </div>
//       </div>
//     </>
//   );
// }

import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Header } from "../components/Header";

import { MailContext } from "../contexts/MailProvider";

export function MailDetail() {
  const { dispatch } = useContext(MailContext);

  const { mailId } = useParams();

  const { inbox } = useContext(MailContext);

  const selectedMail = inbox.find(({ mId }) => mId == mailId);

  const handleStarClick = (id) => {
    dispatch({ type: "star-unstar", payload: id });
  };

  const handleReadClick = (id) => {
    dispatch({ type: "read-unread", payload: id });
  };

  return (
    <>
      <div className="whole-component">
        <div>
          <Header />
        </div>
        <div
          style={{
            // border: "1px solid ",
            borderRadius: "5px",
            margin: "20px 0px",
            padding: "15px",
            listStylePosition: "outside",
            background: selectedMail.unread ? "#e4ecf5" : "white",
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
          }}
        >
          <div className="subj-n-strbtn">
            <div className="subject">
              <h3 style={{ fontSize: "2rem" }}>
                Subject: {selectedMail.subject}
              </h3>
            </div>
            <div>
              <button
                onClick={() => handleStarClick(selectedMail.mId)}
                className="str-btn"
                style={{ fontSize: selectedMail.isStarred ? "1.5rem" : "2rem" }}
              >
                {selectedMail.isStarred ? "⭐" : "☆"}
              </button>
            </div>
          </div>
          <p style={{ fontSize: "1.5rem" }}>{selectedMail.content}</p>
          <div className="view-n-btns">
            <div>
              <NavLink to="/" className="back-to-inbox">
                Back to inbox
              </NavLink>
            </div>
            <div className="non-star-btns">
              <button onClick={() => selectedMail.deleteMail(selectedMail.mId)}>
                Delete
              </button>
              <button onClick={() => handleReadClick(selectedMail.mId)}>
                {selectedMail.unread ? "Mark as Read" : "Mark as Unread"}
              </button>
              <button onClick={() => selectedMail.reportSpam(selectedMail.mId)}>
                Report Spam
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
