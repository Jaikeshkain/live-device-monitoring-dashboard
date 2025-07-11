import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RecordingsPage from "./pages/RecordingsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/device/:id/recordings" element={<RecordingsPage />} />
      </Routes>
    </Router>
  );
}
