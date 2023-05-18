import { Routes, Route } from "react-router-dom";
import { Inbox } from "./pages/Inbox";
import { MailDetail } from "./pages/MailDetail";
import { Spam } from "./pages/Spam";
import { Trash } from "./pages/Trash";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1 className="heading">Y-Mail</h1>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/spam" element={<Spam />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/maildetail/:mailId" element={<MailDetail />} />
      </Routes>
    </div>
  );
}
