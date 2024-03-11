import express from 'express';
import {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getOneTeachers
} from "../Controller/controller.js";

const router = express.Router();

router.get('/teachers', getAllTeachers);
router.get('/teachers/:id', getOneTeachers);

router.post('/teachers', addTeacher);

router.put('/teachers/:id', updateTeacher);

router.delete('/teachers/:id', deleteTeacher);

export default router;
