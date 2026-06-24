/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import StudentList from './pages/StudentList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<Registration />} />
          <Route path="students" element={<StudentList />} />
        </Route>
      </Routes>
    </Router>
  );
}
