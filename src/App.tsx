import { Route, Routes } from "react-router-dom";
import BookingPage from "@/pages/BookingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BookingPage />} />
      <Route
        path="*"
        element={
          <div className="text-center mt-20 text-xl text-red-600">
            404 - Page Not Found
          </div>
        }
      />
      {/* future routes can go here */}
    </Routes>
  );
}
