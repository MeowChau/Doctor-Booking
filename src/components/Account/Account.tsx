import React, { useState, useEffect } from 'react';
import { Typography, Form, Input, Button, message, Card, DatePicker } from 'antd';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import moment from 'moment';

const { Title } = Typography;

const Account: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    const users = getFromLocalStorage('users') || [];
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const user = users.find((u: { email: string }) => u.email === loggedInUserEmail);
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (values: any) => {
    const users = getFromLocalStorage('users') || [];
    const updatedUsers = users.map((u: { email: string }) =>
      u.email === userData.email ? { ...u, ...values, dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD') } : u
    );
    saveToLocalStorage('users', updatedUsers);
    setUserData({ ...values, dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD') });
    localStorage.setItem('loggedInUser', values.email); // Cập nhật email trong localStorage
    setIsEditing(false);
    message.success('Thông tin đã được cập nhật!');
  };

  return (
    <div style={{ padding: '40px 80px' }}>
      <Card style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
          Thông tin tài khoản
        </Title>
        {!isEditing ? (
          <div>
            <p><strong>Họ và tên:</strong> {userData.fullName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Số điện thoại:</strong> {userData.phoneNumber}</p>
            <p><strong>Ngày sinh:</strong> {userData.dateOfBirth}</p>
            <Button type="primary" onClick={handleEdit} block>
              Chỉnh sửa
            </Button>
          </div>
        ) : (
          <Form
            layout="vertical"
            initialValues={{
              ...userData,
              dateOfBirth: userData.dateOfBirth ? moment(userData.dateOfBirth, 'YYYY-MM-DD') : null,
            }}
            onFinish={handleSave}
          >
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default Account;
export {}; // Đảm bảo file được coi là một module
