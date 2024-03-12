import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./UpdateTeacherForm.css"

const UpdateTeacherForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: `${params.id}`,
    fullName: '',
    age: '',
    dateOfBirth: '',
    numberOfClasses: '',
  });


  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`https://persidio-backend.onrender.com/teachers/${params.id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };
    fetchTeacher();
  }, [params.id]);

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
      console.log('Entered Age:', formData.age);

      if(formData.numberOfClasses < 25){
        alert("No of classes for a Teacher can't be less than 25")
      } else if(formData.numberOfClasses > 200){
        alert("No of classes for a Teacher can't exceeds 200")
      } else if(calculatedAge < 18){
        alert("Age of a teacher can't be less than 18")
      } else {
        formData.age = calculatedAge
      await axios.put(`https://persidio-backend.onrender.com/teachers/${params.id}`, formData);
      navigate("/");
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  return (
    <div className="update-teacher-container">
      <h1>Update Teacher</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>
        {/* <label>
          Age:
          <input type="text" name="age" value={formData.age} onChange={handleChange} />
        </label> */}
        <label className='dob'>
          DOB:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </label>
        <label>
          No. of Classes:
          <input type="text" name="numberOfClasses" value={formData.numberOfClasses} onChange={handleChange} />
        </label>
        <button type="submit">Update Teacher</button>
      </form>
    </div>
  );
};

export default UpdateTeacherForm;
