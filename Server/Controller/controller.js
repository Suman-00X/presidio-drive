import Teacher from '../Database/models.js';

// Get all 
export const getAllTeachers = async (req, res) => {
  console.log("getAllTeachers Called")
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


//Get one
export const getOneTeachers = async (req, res) => {
  const { id } = req.params;
  try {
    const OneTeacher = await Teacher.findById(id);
    if (!OneTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(OneTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Add 
export const addTeacher = async (req, res) => {
  const { fullName, age, dateOfBirth, numberOfClasses } = req.body;
  try {
    const newTeacher = new Teacher({
      fullName,
      age,
      dateOfBirth,
      numberOfClasses
    });
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Update
export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { fullName, age, dateOfBirth, numberOfClasses } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      {
        fullName,
        age,
        dateOfBirth,
        numberOfClasses
      },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Delete
export const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
