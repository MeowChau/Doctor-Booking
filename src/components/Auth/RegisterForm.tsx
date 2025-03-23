import React, { useState } from 'react';
import { Form, Input, Button, Typography, DatePicker, message } from 'antd';
import { saveUser } from '../../utils/localStorage';

const { Title } = Typography;

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegisterSuccess?: (email: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!dateOfBirth) {
      message.error('Vui lòng chọn ngày sinh!');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      message.error('Số điện thoại phải có đúng 10 chữ số!');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      message.error('Email phải kết thúc bằng @gmail.com!');
      return;
    }

    if (password.length < 6) {
      message.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    try {
      saveUser(email, password, fullName, phoneNumber, dateOfBirth);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loggedInUser', email);
      message.success('Đăng ký thành công!');
      if (onRegisterSuccess) onRegisterSuccess(email);
    } catch (error: any) {
      message.error(error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <Title level={3}>Đăng ký</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
          <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Item>
        <Form.Item label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}>
          <DatePicker
            style={{ width: '100%' }}
            onChange={(date, dateString) => setDateOfBirth(typeof dateString === 'string' ? dateString : null)}
          />
        </Form.Item>
        <Form.Item label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={onSwitchToLogin} block>
            Đã có tài khoản? Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;