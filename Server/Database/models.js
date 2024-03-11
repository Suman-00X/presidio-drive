import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  numberOfClasses: {
    type: Number,
    required: true
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
