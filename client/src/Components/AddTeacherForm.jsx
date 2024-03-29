import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AddTeacherForm.css"

const AddTeacherForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    numberOfClasses: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAgeFromDOB = () => {
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const calculatedAge = calculateAgeFromDOB();

      console.log('Calculated Age:', calculatedAge);
      // console.log('Entered Age:', formData.age);

      if(formData.numberOfClasses < 25){
        alert("No of classes for a Teacher can't be less than 25")
      } else if(formData.numberOfClasses > 200){
        alert("No of classes for a Teacher can't exceeds 200")
      } else if(calculatedAge < 18){
        alert("Age of a teacher can't be less than 18")
      } else {
        formData.age = calculatedAge;
        await axios.post("https://persidio-backend.onrender.com/teachers", formData);
        navigate("/");
      }

    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <div className="add-teacher-container">
      <h1>Add Teacher</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" onChange={handleChange} />
        </label>
        {/* <label>
          Age:
          <input type="text" name="age" onChange={handleChange} />
        </label> */}
        <label>
          DOB:
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          No. of Classes:
          <input type="text" name="numberOfClasses" onChange={handleChange} />
        </label>

        <button type="submit">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacherForm;
