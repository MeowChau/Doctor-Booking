import React from 'react';
import { Typography, Row, Col, Layout, Divider } from 'antd'; // Import Layout từ antd

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const Contact: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: '40px 80px', backgroundColor: '#f9f9f9' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Liên hệ với chúng tôi</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Title level={3} style={{ color: '#333' }}>Thông tin liên hệ</Title>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>Email: contact@doctorbooking.com</Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>Hotline: 1900 123 456</Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh</Paragraph>
          </Col>
          <Col span={12}>
            <Title level={3} style={{ color: '#333' }}>Giờ làm việc</Title>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>Thứ 2 - Thứ 6: 8:00 AM - 6:00 PM</Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>Thứ 7: 8:00 AM - 12:00 PM</Paragraph>
            <Paragraph style={{ fontSize: '16px', color: '#555' }}>Chủ nhật: Nghỉ</Paragraph>
          </Col>
        </Row>
      </Content>
      <Divider style={{ margin: '40px 0' }} />
      <Row style={{ marginTop: '40px' }}>
        <Col span={12} style={{ textAlign: 'left', paddingRight: '20px' }}>
          <img
            src="https://via.placeholder.com/150"
            alt="Logo công ty"
            style={{ marginBottom: '20px' }}
          />
          <Title level={3} style={{ color: '#333' }}>Sứ mệnh của chúng tôi</Title>
          <Text style={{ fontSize: '16px', color: '#555' }}>
            Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất, giúp bạn và gia đình luôn khỏe mạnh và hạnh phúc.
          </Text>
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingLeft: '20px' }}>
          <Title level={3} style={{ color: '#333' }}>Liên hệ với chúng tôi</Title>
          <Text style={{ fontSize: '16px', color: '#555' }}>Email: contact@doctorbooking.com</Text>
          <br />
          <Text style={{ fontSize: '16px', color: '#555' }}>Hotline: 1900 123 456</Text>
          <br />
          <Text style={{ fontSize: '16px', color: '#555' }}>Địa chỉ: 123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh</Text>
        </Col>
      </Row>
    </Layout>
  );
};

export default Contact;
