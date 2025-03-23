import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Typography, Button, Modal, message } from 'antd';
import { UserOutlined, LogoutOutlined, CalendarOutlined, HomeOutlined, InfoCircleOutlined, PhoneOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import useAuth from '../../hooks/useAuth';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { authState, login, logout } = useAuth();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);

  const handleLoginSuccess = (email: string) => {
    setIsLoginModalVisible(false);
    login(email); // Cập nhật trạng thái đăng nhập
    message.success('Đăng nhập thành công!');
    navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập
  };

  const handleRegisterSuccess = (email: string) => {
    setIsRegisterModalVisible(false);
    login(email); // Cập nhật trạng thái đăng nhập
    message.success('Đăng ký thành công!');
    navigate('/'); // Điều hướng về trang chủ sau khi đăng ký
  };

  const menu = (
    <Menu>
      <Menu.Item key="account" icon={<UserOutlined />} onClick={() => navigate('/account')}>
        Tài khoản
      </Menu.Item>
      <Menu.Item key="appointments" icon={<CalendarOutlined />} onClick={() => navigate('/appointments')}>
        Lịch khám bệnh
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://via.placeholder.com/120x40"
            alt="Logo công ty"
            style={{ height: '40px', marginRight: '20px' }}
          />
          <Title level={4} style={{ color: '#fff', margin: 0 }}>Doctor Booking</Title>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ background: 'transparent' }}
            onClick={(e) => {
              if (e.key === '1') navigate('/');
              if (e.key === '2') navigate('/doctors');
              if (e.key === '3') navigate('/about');
              if (e.key === '4') navigate('/contact');
            }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>Trang chủ</Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>Tất cả bác sĩ</Menu.Item>
            <Menu.Item key="3" icon={<InfoCircleOutlined />}>Giới thiệu</Menu.Item>
            <Menu.Item key="4" icon={<PhoneOutlined />}>Liên hệ</Menu.Item>
          </Menu>
        </div>
        {authState.isLoggedIn ? (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button
              type="text"
              style={{ color: '#fff', display: 'flex', alignItems: 'center' }}
              icon={<UserOutlined />}
            >
              <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <>
            <Button type="primary" onClick={() => setIsLoginModalVisible(true)} style={{ marginLeft: '20px' }}>
              Đăng nhập
            </Button>
            <Button type="default" onClick={() => setIsRegisterModalVisible(true)} style={{ marginLeft: '10px' }}>
              Đăng ký
            </Button>
          </>
        )}
      </AntHeader>

      {/* Modal chứa form đăng nhập */}
      <Modal
        title="Đăng nhập"
        visible={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
        footer={null}
      >
        <LoginForm 
          onLogin={handleLoginSuccess} 
          onSwitchToRegister={() => {
            setIsLoginModalVisible(false);
            setIsRegisterModalVisible(true);
          }} 
        />
      </Modal>

      {/* Modal chứa form đăng ký */}
      <Modal
        title="Đăng ký"
        visible={isRegisterModalVisible}
        onCancel={() => setIsRegisterModalVisible(false)}
        footer={null}
      >
        <RegisterForm 
          onRegisterSuccess={handleRegisterSuccess} 
          onSwitchToLogin={() => {
            setIsRegisterModalVisible(false);
            setIsLoginModalVisible(true);
          }} 
        />
      </Modal>
    </>
  );
};

export default Header;