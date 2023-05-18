import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Header } from "../components/Header";

import { MailContext } from "../contexts/MailProvider";

export function Inbox() {
  const { inbox, showUnread, showStarred, dispatch } = useContext(MailContext);

  let inboxDisplay = [...inbox];

  if (showStarred && showUnread) {
    inboxDisplay = inboxDisplay.filter(
      ({ unread, isStarred }) => unread && isStarred
    );
  } else if (showStarred) {
    inboxDisplay = inboxDisplay.filter(({ isStarred }) => isStarred);
  } else if (showUnread) {
    inboxDisplay = inboxDisplay.filter(({ unread }) => unread);
  }

  const unreadCount = inbox.reduce(
    (count, { unread }) => (unread ? count + 1 : count),
    0
  );

  const handleShowUnred = () => {
    dispatch({ type: "show-unread" });
  };

  const handleShowStarred = () => {
    dispatch({ type: "show-starred" });
  };

  const handleStarClick = (id) => {
    dispatch({ type: "star-unstar", payload: id });
  };

  const handleReadClick = (id) => {
    dispatch({ type: "read-unread", payload: id });
  };

  const deleteMail = (id) => {
    dispatch({ type: "delete-mail", payload: id });
  };

  const reportSpam = (id) => {
    dispatch({ type: "report-spam", payload: id });
  };

  return (
    <>
      <div className="whole-component">
        <div>
          <Header />
        </div>
        <div className="mails-display">
          <div className="filters">
            <fieldset>
              <legend>Filters</legend>
              <label>
                <input type="checkbox" onChange={handleShowUnred} />
                Show unread mails
              </label>
              <label>
                <input type="checkbox" onChange={handleShowStarred} />
                Show starred mails
              </label>
            </fieldset>
          </div>
          <h3>Unread: {unreadCount}</h3>
          <ul style={{ listStyle: "none", marginLeft: 0 }}>
            {inboxDisplay.map(
              ({ mId, unread, isStarred, subject, content }) => (
                <li
                  key={mId}
                  style={{
                    border: "1px solid ",
                    borderRadius: "5px",
                    margin: "20px 0px",
                    padding: "15px",
                    listStylePosition: "outside",
                    background: unread ? "#e4ecf5" : "white",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                  }}
                >
                  <div className="subj-n-strbtn">
                    <div className="subject">
                      <h3>Subject: {subject}</h3>
                    </div>
                    <div>
                      <button
                        onClick={() => handleStarClick(mId)}
                        className="str-btn"
                        style={{ fontSize: isStarred ? "1.5rem" : "2rem" }}
                      >
                        {isStarred ? "⭐" : "☆"}
                      </button>
                    </div>
                  </div>
                  <p>{content}</p>
                  <div className="view-n-btns">
                    <div>
                      <NavLink
                        to={`/maildetail/${mId}`}
                        className="view-details"
                      >
                        View Details
                      </NavLink>
                    </div>

                    <div className="non-star-btns">
                      <button onClick={() => deleteMail(mId)}>Delete</button>
                      <button onClick={() => handleReadClick(mId)}>
                        {unread ? "Mark as Read" : "Mark as Unread"}
                      </button>
                      <button onClick={() => reportSpam(mId)}>
                        Report Spam
                      </button>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
