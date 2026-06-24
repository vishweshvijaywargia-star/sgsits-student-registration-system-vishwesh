import { Request, Response, NextFunction } from 'express';
import Student from '../models/Student';

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, enrollment_number, email, mobile_number, branch } = req.body;
    
    // Basic validation
    if (!name || name.length < 3) return res.status(400).json({ success: false, message: 'Name is required and must be at least 3 characters' });
    if (!enrollment_number) return res.status(400).json({ success: false, message: 'Enrollment number is required' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Valid email is required' });
    if (!mobile_number || !/^\d{10}$/.test(mobile_number)) return res.status(400).json({ success: false, message: 'Mobile number must be exactly 10 digits' });
    if (!branch) return res.status(400).json({ success: false, message: 'Branch is required' });

    // Check unique constraints
    const existingEnrollment = await Student.findOne({ where: { enrollment_number } });
    if (existingEnrollment) return res.status(400).json({ success: false, message: 'Enrollment number already exists' });

    const existingEmail = await Student.findOne({ where: { email } });
    if (existingEmail) return res.status(400).json({ success: false, message: 'Email already exists' });

    const student = await Student.create({
      name,
      enrollment_number,
      email,
      mobile_number,
      branch
    });

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await Student.findAll({
      order: [['created_at', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, enrollment_number, email, mobile_number, branch } = req.body;

    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check unique constraints if enrollment or email is being updated
    if (enrollment_number && enrollment_number !== student.enrollment_number) {
      const existing = await Student.findOne({ where: { enrollment_number } });
      if (existing) return res.status(400).json({ success: false, message: 'Enrollment number already exists' });
    }
    
    if (email && email !== student.email) {
      const existing = await Student.findOne({ where: { email } });
      if (existing) return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    await student.update({ name, enrollment_number, email, mobile_number, branch });

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    await student.destroy();

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
