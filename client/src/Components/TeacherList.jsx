import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

import "./TeacherList.css"

const TeacherList = () => {

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("https://persidio-backend.onrender.com/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAgeFilter = (e) => {
    setAgeFilter(e.target.value);
  };

  const handleClassFilter = (e) => {
    setClassFilter(e.target.value);
  };

  const filterByAgeRange = (teacherAge) => {
    if (ageFilter === "") {
      return true;
    }

    const [min, max] = ageFilter.split("-").map(Number);

    if (max) {
      return teacherAge >= min && teacherAge <= max;
    } else {
      return teacherAge >= min;
    }
  };

  const filterByClassRange = (numberOfClasses) => {
    if (classFilter === "") {
      return true;
    }

    const [min, max] = classFilter.split("-").map(Number);

    if (max) {
      return numberOfClasses >= min && numberOfClasses <= max;
    } else {
      return numberOfClasses >= min;
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByAgeRange(teacher.age) &&
      filterByClassRange(teacher.numberOfClasses)
    );
  });

  let avarageClass = 0;
  let sum = 0
  let i = 0;
  filteredTeachers.map((teacher) => {
    sum += teacher.numberOfClasses;
    i++;
  })
  avarageClass = sum / i;

  let avarageAge = 0;
  sum = 0
  i = 0;
  filteredTeachers.map((teacher) => {
    sum += teacher.age;
    i++;
  })
  avarageAge = sum / i;

  filteredTeachers.push({ fullName: "Avarage", age: avarageAge, numberOfClasses: avarageClass })

  const handleDelete = async (id) => {
    console.log("Delete had been called")
    try {
      console.log("List before deletion", teachers)
      await axios.delete(`https://persidio-backend.onrender.com/teachers/${id}`);
      const updatedTeachers = teachers.filter((teacher) => teacher._id !== id);
      setTeachers(updatedTeachers);
      console.log("List after deletion", teachers)
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="teacher-list-container">

      <h1>Teacher List</h1>

      <Link to="/add-teacher" className="add-teacher-link">Add Teacher</Link>
      <div>

        <label>
          Search:
          <input type="text" onChange={handleSearch} />
        </label>

        <label>
          Filter by Age:
          <select onChange={handleAgeFilter}>
            <option value="">All</option>
            <option value="0-20">Less than 20</option>
            <option value="20-30">20-30</option>
            <option value="30-40">30-40</option>
            <option value="40-50">40-50</option>
            <option value="50-60">50-60</option>
            <option value="60-110">Greater than 60</option>
          </select>
        </label>

        <label>
          Filter by Number of Classes:
          <select onChange={handleClassFilter}>
            <option value="">All</option>
            <option value="25-50">Less than 50</option>
            <option value="50-70">50-70</option>
            <option value="70-90">70-90</option>
            <option value="90-120">90-120</option>
            <option value="120-150">120-150</option>
            <option value="150-180">150-180</option>
            <option value="180-200">Greater than 180</option>
          </select>
        </label>

      </div>

      <table>

        <thead>          <tr>
            <th>Teacher's Name</th>
            <th>Age</th>
            <th>Number of Classes(per semester)</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {filteredTeachers.map((teacher, index, array) => (
            <tr key={teacher._id}>
              <td>{index === array.length - 1 ? <strong>{teacher.fullName}</strong> : teacher.fullName}</td>
              <td>{index === array.length - 1 ? <strong>{teacher.age}</strong> : teacher.age}</td>
              <td>{index === array.length - 1 ? <strong>{teacher.numberOfClasses}</strong> : teacher.numberOfClasses}</td>
              <td>
                {index < array.length - 1 ? (
                  <button className="modify">
                    <Link to={`/update-teacher/${teacher._id}`}>Modify</Link>
                  </button>
                ) : null}
              </td>
              <td>
                {index < array.length - 1 ? (
                  <button className="delete" onClick={() => handleDelete(teacher._id)}>
                    Delete
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default TeacherList;
