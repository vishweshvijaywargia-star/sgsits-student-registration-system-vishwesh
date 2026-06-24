import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    enrollment_number: '',
    email: '',
    mobile_number: '',
    branch: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    else if (formData.name.length < 3) newErrors.name = 'Minimum 3 characters required';

    if (!formData.enrollment_number) newErrors.enrollment_number = 'Enrollment Number is required';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email format required';

    if (!formData.mobile_number) newErrors.mobile_number = 'Mobile Number is required';
    else if (!/^\d{10}$/.test(formData.mobile_number)) newErrors.mobile_number = 'Exactly 10 digits required';

    if (!formData.branch) newErrors.branch = 'Branch is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    setServerError('');
    
    if (validate()) {
      try {
        const response = await axios.post('/api/students', formData);
        if (response.data.success) {
          setSuccessMsg('Student added successfully!');
          handleReset();
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError('An error occurred during registration.');
        }
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      enrollment_number: '',
      email: '',
      mobile_number: '',
      branch: ''
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="text-sm font-bold">Student Registration</h3>
        <Link to="/" className="text-blue-600 text-xs hover:underline">Back to Dashboard</Link>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-4 rounded-sm text-sm">
          {successMsg}
        </div>
      )}

      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 mb-4 rounded-sm text-sm">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className={`form-input ${errors.name ? '!border-red-500' : ''}`}
            placeholder="e.g. Rahul Sharma"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Enrollment Number *</label>
          <input 
            type="text" 
            name="enrollment_number" 
            value={formData.enrollment_number} 
            onChange={handleChange}
            className={`form-input ${errors.enrollment_number ? '!border-red-500' : ''}`}
            placeholder="e.g. 0101CS221045"
          />
          {errors.enrollment_number && <p className="text-red-500 text-xs mt-1">{errors.enrollment_number}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className={`form-input ${errors.email ? '!border-red-500' : ''}`}
            placeholder="e.g. rahul@sgsits.ac.in"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number *</label>
          <input 
            type="text" 
            name="mobile_number" 
            value={formData.mobile_number} 
            onChange={handleChange}
            className={`form-input ${errors.mobile_number ? '!border-red-500' : ''}`}
            placeholder="e.g. 9876543210"
          />
          {errors.mobile_number && <p className="text-red-500 text-xs mt-1">{errors.mobile_number}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label">Branch *</label>
          <select 
            name="branch" 
            value={formData.branch} 
            onChange={handleChange}
            className={`form-input ${errors.branch ? '!border-red-500' : ''}`}
          >
            <option value="">Select Branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
          </select>
          {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
        </div>

        <div className="flex gap-4 mt-2">
          <button 
            type="submit" 
            className="btn-primary flex-1"
          >
            Submit
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="flex-1 bg-white text-gray-700 px-4 py-2 text-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-colors rounded-sm cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
