import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./components/home/Home";
import Simple from "./components/practice-pages/Simple";
import Layout from "./components/home/Layout";
import Admin_Layout from "./components/admin/admin-nav/Admin_Layout";
import Dashboard from "./components/admin/Dashboard/Dashboard";
import NotFound from "./components/NotFound";
import Profiles from "./components/admin/StudentList/Profiles";
import StudentProfile from "./components/admin/StudentList/StudentProfile";
import Activity from "./components/admin/StudentList/Activity";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path='/simple' element={<Simple />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Admin_Layout>
                <Dashboard />
              </Admin_Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Admin_Layout>
                <Profiles />
              </Admin_Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/student-profile'
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/activity'
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
