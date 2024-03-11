import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teachers from "./Pages/Teachers";
import AddTeacher from "./Pages/AddTeacher";
import UpdateTeacher from "./Pages/UpdateTeacher";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Teachers />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/update-teacher/:id" element={<UpdateTeacher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
