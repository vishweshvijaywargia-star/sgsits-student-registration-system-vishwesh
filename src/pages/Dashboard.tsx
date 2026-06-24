import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const [totalStudents, setTotalStudents] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        if (response.data.success) {
          setTotalStudents(response.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold mb-1">Dashboard Overview</h2>
        <p className="text-sm text-gray-600">Welcome to SGSITS Student Registration System. This portal allows administrators to register and manage student records efficiently.</p>
      </div>
      
      <div className="flex gap-6 flex-wrap">
        <div className="card flex-1 min-w-[200px] border-t-4 border-sgsits">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Registered Students</div>
          <div className="text-3xl font-bold text-sgsits">
            {totalStudents !== null ? totalStudents : '...'}
          </div>
          <div className="mt-2 text-xs text-green-600">Updated recently</div>
        </div>

        <div className="card flex-1 min-w-[200px] border-t-4 border-blue-400">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Active Branches</div>
          <div className="text-3xl font-bold">06</div>
          <div className="mt-2 text-xs text-gray-400">CS, IT, EC, ME, CE, EE</div>
        </div>

        <div className="card flex-1 min-w-[200px] border-t-4 border-gray-300">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">System Status</div>
          <div className="text-3xl font-bold text-gray-700">ONLINE</div>
          <div className="mt-2 text-xs text-gray-400">DB Sync: Just now</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link 
          to="/register" 
          className="btn-primary no-underline text-center inline-block"
        >
          Register New Student
        </Link>
        <Link 
          to="/students" 
          className="bg-white text-[#444] px-4 py-2 font-semibold border border-[#ccc] rounded-sm hover:bg-gray-50 transition-colors no-underline inline-block text-center"
        >
          View Student List
        </Link>
      </div>
    </div>
  );
}
