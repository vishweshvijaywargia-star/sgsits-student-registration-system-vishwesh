import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  enrollment_number: string;
  email: string;
  mobile_number: string;
  branch: string;
  created_at: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchEnrollment, setSearchEnrollment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchName.toLowerCase()) &&
    student.enrollment_number.toLowerCase().includes(searchEnrollment.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h3 className="text-sm font-bold">Student List</h3>
        <Link to="/" className="text-blue-600 text-xs hover:underline">Back to Dashboard</Link>
      </div>

      <div className="card mb-6 py-4 flex flex-wrap gap-4 items-end">
        <div>
          <label className="form-label">Search by Name</label>
          <input 
            type="text" 
            value={searchName} 
            onChange={(e) => { setSearchName(e.target.value); setCurrentPage(1); }}
            className="form-input w-48"
            placeholder="Enter name..."
          />
        </div>
        <div>
          <label className="form-label">Search by Enrollment No.</label>
          <input 
            type="text" 
            value={searchEnrollment} 
            onChange={(e) => { setSearchEnrollment(e.target.value); setCurrentPage(1); }}
            className="form-input w-48"
            placeholder="Enter enrollment..."
          />
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading students...</p>
      ) : (
        <div className="border border-gray-200 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05)] rounded-sm">
          <div className="overflow-x-auto">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Enrollment No.</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Branch</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.enrollment_number}</td>
                      <td>{student.email}</td>
                      <td>{student.mobile_number}</td>
                      <td>{student.branch}</td>
                      <td>{new Date(student.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-gray-500">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-3 text-xs text-gray-500 text-center border-t border-gray-200 bg-gray-50 flex gap-2 justify-center items-center">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-100 cursor-pointer rounded-sm"
              >
                Previous
              </button>
              <span className="font-semibold">Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 bg-white disabled:opacity-50 hover:bg-gray-100 cursor-pointer rounded-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
