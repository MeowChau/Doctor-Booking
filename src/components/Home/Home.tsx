import React from 'react';
import { Layout, Row, Col, Typography, Card, Divider, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

interface HomeProps {
  diseases: { name: string; icon: React.ReactNode }[];
  featuredDoctors: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
  }[];
  onRequireLogin: () => void;
}

const Home: React.FC<HomeProps> = ({ diseases, featuredDoctors, onRequireLogin }) => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/appointments'); // Điều hướng đến trang lịch khám nếu đã đăng nhập
    } else {
      message.error('Bạn cần đăng nhập để đặt lịch khám!'); // Hiển thị thông báo nếu chưa đăng nhập
      navigate('/account'); // Điều hướng đến trang đăng nhập
    }
  };

  return (
    <Content style={{ padding: '40px 80px', backgroundColor: '#f9f9f9' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Các bệnh quan tâm
      </Title>
      <Row gutter={[16, 16]}>
        {diseases.map((disease, index) => (
          <Col key={index} span={4}>
            <Card
              hoverable
              onClick={() => navigate(`/disease/${disease.name.toLowerCase().replace(/\s+/g, '-')}`)}
              style={{
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '15px',
              }}
            >
              {disease.icon}
              <Title level={5} style={{ marginTop: '10px', color: '#555', fontSize: '16px' }}>{disease.name}</Title>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider style={{ margin: '40px 0' }} />
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <img
          src="https://via.placeholder.com/1600x800"
          alt="Banner sức khỏe"
          style={{
            width: '100%',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Button
          type="primary"
          size="large"
          style={{
            fontSize: '20px', // Giữ nguyên kích thước chữ
            padding: '16px 80px', // Tăng padding để nút lớn hơn
            borderRadius: '10px', // Làm nút tròn hơn
            fontWeight: 'bold',
            whiteSpace: 'nowrap', // Đảm bảo chữ không bị xuống dòng
          }}
          onClick={handleBookingClick} // Gọi hàm xử lý khi nhấn nút
        >
          Đặt lịch khám
        </Button>
      </div>
      <Divider style={{ margin: '40px 0' }} />
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Bác sĩ tiêu biểu
      </Title>
      <Row gutter={[24, 24]}>
        {featuredDoctors.map((doctor) => (
          <Col key={doctor.id} span={8}>
            <Card
              hoverable
              title={doctor.name}
              onClick={() => navigate(`/doctor/${doctor.id}`)}
              style={{
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                padding: '20px',
              }}
            >
              <p style={{ fontSize: '16px', color: '#555' }}>
                <strong>Chuyên ngành:</strong> {doctor.specialty}
              </p>
              <p style={{ fontSize: '16px', color: '#555' }}>
                <strong>Kinh nghiệm:</strong> {doctor.experience}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider style={{ margin: '40px 0' }} />
      <Row style={{ marginTop: '40px' }}>
        <Col span={12} style={{ textAlign: 'left', paddingRight: '20px' }}>
          <img
            src="https://via.placeholder.com/150"
            alt="Logo công ty"
            style={{ marginBottom: '20px' }}
          />
          <Title level={3} style={{ color: '#333' }}>Sứ mệnh của chúng tôi</Title>
          <Typography.Paragraph style={{ fontSize: '16px', color: '#555' }}>
            Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất, giúp bạn và gia đình luôn khỏe mạnh và hạnh phúc.
          </Typography.Paragraph>
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingLeft: '20px' }}>
          <Title level={3} style={{ color: '#333' }}>Liên hệ với chúng tôi</Title>
          <Typography.Paragraph style={{ fontSize: '16px', color: '#555' }}>Email: contact@doctorbooking.com</Typography.Paragraph>
          <Typography.Paragraph style={{ fontSize: '16px', color: '#555' }}>Hotline: 1900 123 456</Typography.Paragraph>
          <Typography.Paragraph style={{ fontSize: '16px', color: '#555' }}>Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh</Typography.Paragraph>
        </Col>
      </Row>
    </Content>
  );
};

export default Home;
