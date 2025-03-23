import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd'; // Sửa import Layout từ 'antd'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './components/Home/Home';
import DiseaseDetail from './components/DiseaseDetail';
import DoctorDetail from './components/Doctor/DoctorDetail'; // Import DoctorDetail
import DoctorList from './components/Doctor/DoctorList'; // Import DoctorList
import { saveUser, getFromLocalStorage } from './utils/localStorage';
import {
  HeartTwoTone,
  MedicineBoxTwoTone,
  ExperimentTwoTone,
  CloudTwoTone,
  FireTwoTone,
  ThunderboltTwoTone,
  AlertTwoTone,
  SmileTwoTone,
  BulbTwoTone,
  CrownTwoTone,
  RocketTwoTone,
  SettingTwoTone,
} from '@ant-design/icons';
import About from './components/About'; // Import About
import Contact from './components/Contact'; // Import Contact
import DoctorIntroduction from './components/Doctor/DoctorIntroduction'; // Import DoctorIntroduction
import Account from './components/Account/Account'; // Import Account component
import Appointments from './components/Appointments/Appointments'; // Import Appointments component

const { Footer } = Layout;

const App: React.FC = () => {
  const [isLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleRequireLogin = () => {
    message.error('Bạn cần đăng nhập để tiếp tục!');
  };

  // Removed unused handleLogout function to fix the error

  useEffect(() => {
    const initializeAdminAccount = async () => {
      try {
        const users = getFromLocalStorage('users') || [];
        const adminExists = users.some((user: { email: string }) => user.email === '123@gmail.com');
        if (!adminExists) {
          saveUser('123@gmail.com', '123456', 'Admin User', '0123456789', '2000-01-01'); // Tạo tài khoản admin mặc định
          console.log('Admin account created.');
        }
      } catch (error) {
        console.log('Error creating admin account:', error);
      }
    };

    initializeAdminAccount();
  }, []);

  const diseases = [
    { name: 'Bệnh tim mạch', icon: <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '28px' }} /> },
    { name: 'Tiểu đường', icon: <MedicineBoxTwoTone twoToneColor="#1890ff" style={{ fontSize: '28px' }} /> },
    { name: 'Ung thư', icon: <ExperimentTwoTone twoToneColor="#faad14" style={{ fontSize: '28px' }} /> },
    { name: 'Hen suyễn', icon: <CloudTwoTone twoToneColor="#52c41a" style={{ fontSize: '28px' }} /> },
    { name: 'Viêm khớp', icon: <FireTwoTone twoToneColor="#722ed1" style={{ fontSize: '28px' }} /> },
    { name: 'Tăng huyết áp', icon: <ThunderboltTwoTone twoToneColor="#ff4d4f" style={{ fontSize: '28px' }} /> },
    { name: 'Đột quỵ', icon: <AlertTwoTone twoToneColor="#faad14" style={{ fontSize: '28px' }} /> },
    { name: 'Béo phì', icon: <SmileTwoTone twoToneColor="#52c41a" style={{ fontSize: '28px' }} /> },
    { name: 'Trầm cảm', icon: <BulbTwoTone twoToneColor="#1890ff" style={{ fontSize: '28px' }} /> },
    { name: 'Bệnh Alzheimer', icon: <CrownTwoTone twoToneColor="#722ed1" style={{ fontSize: '28px' }} /> },
    { name: 'Loãng xương', icon: <RocketTwoTone twoToneColor="#1890ff" style={{ fontSize: '28px' }} /> },
    { name: 'Bệnh Parkinson', icon: <SettingTwoTone twoToneColor="#faad14" style={{ fontSize: '28px' }} /> },
  ];

  const featuredDoctors = [
    {
      id: '1',
      name: 'Dr. John Doe',
      specialty: 'Cardiologist',
      experience: '10 Years',
      about: 'Expert in heart diseases.',
      fee: '$100',
      education: 'Harvard Medical School',
      workHistory: 'Worked at Boston General Hospital for 10 years.',
    },
    {
      id: '2',
      name: 'Dr. Jane Smith',
      specialty: 'Dermatologist',
      experience: '8 Years',
      about: 'Specialist in skin care.',
      fee: '$80',
      education: 'Stanford University School of Medicine',
      workHistory: 'Worked at California Skin Institute for 8 years.',
    },
    {
      id: '3',
      name: 'Dr. Emily Johnson',
      specialty: 'Pediatrician',
      experience: '5 Years',
      about: 'Caring for children.',
      fee: '$70',
      education: 'Johns Hopkins University',
      workHistory: 'Worked at Children\'s National Hospital for 5 years.',
    },
  ];

  return (
    <Router>
      <Layout>
        <Header />
        {!isLoggedIn ? (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Vui lòng đăng nhập để sử dụng ứng dụng.</p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Home diseases={diseases} featuredDoctors={featuredDoctors} onRequireLogin={handleRequireLogin} />}
            />
            <Route path="/account" element={<Account />} /> {/* Route cho tài khoản */}
            <Route path="/appointments" element={<Appointments />} /> {/* Route cho lịch khám bệnh */}
            <Route path="/disease/:diseaseId" element={<DiseaseDetail />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctor/:doctorId" element={<DoctorDetail />} /> {/* Route cho chi tiết bác sĩ */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doctor-introduction" element={<DoctorIntroduction />} /> {/* Route cho giới thiệu mẫu */}
          </Routes>
        )}
        <Footer style={{ textAlign: 'center' }}>Đặt lịch khám bác sĩ ©2025</Footer>
      </Layout>
    </Router>
  );
};

export default App;
