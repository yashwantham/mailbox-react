import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MailContext } from "../contexts/MailProvider";

export function Header() {
  const { inbox, spam, trash } = useContext(MailContext);

  const inboxCount = inbox.reduce((acc, cur) => acc + 1, 0);
  const spamCount = spam.reduce((acc, cur) => acc + 1, 0);
  const trashCount = trash.reduce((acc, cur) => acc + 1, 0);

  const activeStyle = ({ isActive }) =>
    isActive
      ? { fontWeight: 700, color: "red", borderRight: "4px solid black" }
      : {};

  return (
    <>
      <NavLink to="/" style={activeStyle} className="navlink">
        Inbox({inboxCount})
      </NavLink>
      <NavLink to="/spam" style={activeStyle} className="navlink">
        Spam({spamCount})
      </NavLink>
      <NavLink to="/trash" style={activeStyle} className="navlink">
        Trash({trashCount})
      </NavLink>
    </>
  );
}
