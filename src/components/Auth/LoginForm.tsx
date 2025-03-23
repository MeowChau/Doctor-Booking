import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { findUser } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface LoginFormProps {
  onLogin: (email: string) => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = findUser(email, password);

      if (result.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUser', email);
        message.success('Đăng nhập thành công!');
        onLogin(email); // Truyền email khi đăng nhập thành công
        navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
      } else {
        message.error(result.error || 'Thông tin đăng nhập không hợp lệ.');
        setPassword('');
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '30px', background: '#fff', borderRadius: '8px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Đăng nhập
      </Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={onSwitchToRegister} block>
            Chưa có tài khoản? Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;