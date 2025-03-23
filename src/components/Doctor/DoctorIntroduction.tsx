import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const DoctorIntroduction: React.FC = () => {
  return (
    <div style={{ padding: '40px 80px', backgroundColor: '#f9f9f9' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
        Hoạt động chuyên ngành
      </Title>
      <Paragraph>
        <strong>Trình độ:</strong> Phó giáo sư
      </Paragraph>
      <Paragraph>
        <strong>Vị trí quản lý:</strong> Nguyên Trưởng khoa Lao và Bệnh phổi, Viện Phổi Trung ương; Phó chủ nhiệm Bộ môn Nội Khoa Y, Trường Đại học Y dược - Đại học Quốc gia Hà Nội
      </Paragraph>
      <Paragraph>
        <strong>Số năm kinh nghiệm:</strong> Gần 40 năm
      </Paragraph>
      <Divider />
      <Title level={3}>Quá trình công tác</Title>
      <Paragraph>
        <ul>
          <li>T10/1989 - T9/2003: Bác sĩ điều trị, Bệnh viện Phổi Trung ương.</li>
          <li>T9/2003 - T5/2007: Phó Trưởng khoa Lao và Bệnh phổi, Bệnh viện phổi Trung ương.</li>
          <li>T5/2007 - T2016: Trưởng khoa Lao và Bệnh phổi, Bệnh viện Phổi Trung ương.</li>
          <li>2016 - nay: Giảng viên bộ môn Nội, kiêm nhiệm bộ môn liên chuyên khoa - Khoa Y Dược - Đại học Quốc Gia Hà Nội.</li>
        </ul>
      </Paragraph>
      <Divider />
      <Title level={3}>Quá trình học tập</Title>
      <Paragraph>
        <ul>
          <li>1980 - 1986: Bác sĩ Đa khoa Nội nhi, Đại học Y Hà Nội.</li>
          <li>1999: Thạc sĩ Y Khoa, Đại học Y Hà Nội.</li>
          <li>2010: Tiến sỹ y khoa, Đại học Y Hà Nội.</li>
          <li>2007: Khóa học về phương pháp nghiên cứu do Trung tâm kiểm soát bệnh tật của Mỹ (CDC - USA), Bệnh viện Phổi Trung ương.</li>
          <li>2003: Chuyên khoa định hướng Tim mạch, Viện Tim mạch Quốc gia.</li>
          <li>2015: Khóa đào tạo Kiểm soát Lao và các bệnh nhiễm trùng, Viện Nghiên cứu Lao của Nhật Bản.</li>
          <li>2008: Quản lý Nhà Nước: Chuyên viên Bộ Y Tế, Học viện Hành chính Quốc Gia.</li>
          <li>2009: Chương trình tiến Pháp cơ sở hệ tại chức 2 năm, Đại học Ngoại ngữ Hà Nội.</li>
        </ul>
      </Paragraph>
    </div>
  );
};

export default DoctorIntroduction;
