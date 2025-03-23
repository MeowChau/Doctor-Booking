import React from 'react';
import { Typography, Layout, Divider, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const About: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: '40px 80px', backgroundColor: '#f9f9f9' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Giới thiệu về chúng tôi</Title>
        <Paragraph style={{ fontSize: '16px', color: '#555', lineHeight: '1.8' }}>
          Doctor Booking là nền tảng đặt lịch khám bác sĩ hàng đầu, giúp kết nối bệnh nhân với các bác sĩ chuyên khoa uy tín trên toàn quốc. 
          Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất, tiện lợi và nhanh chóng.
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', color: '#555', lineHeight: '1.8' }}>
          Với đội ngũ bác sĩ giàu kinh nghiệm và hệ thống đặt lịch trực tuyến hiện đại, chúng tôi giúp bạn dễ dàng tìm kiếm và đặt lịch khám phù hợp với nhu cầu của mình.
        </Paragraph>
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

export default About;
