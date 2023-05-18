import { useContext } from "react";
import { Header } from "../components/Header";
import { MailContext } from "../contexts/MailProvider";

export function Spam() {
  const { spam, dispatch } = useContext(MailContext);

  const restoreMail = (id) => {
    dispatch({ type: "restore-mail-spam", payload: id });
  };

  return (
    <>
      <div className="whole-component">
        <div>
          <Header />
        </div>
        <div className="mails-display" style={{ textAlign: "left" }}>
          <ul style={{ listStyle: "none" }}>
            {spam.map(({ mId, subject, content }) => (
              <li
                key={mId}
                style={{
                  border: "2px solid",
                  borderRadius: "5px",
                  padding: "15px"
                }}
              >
                <h3>Subject: {subject}</h3>
                <p>{content}</p>
                <button onClick={() => restoreMail(mId)} className="restore">
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
