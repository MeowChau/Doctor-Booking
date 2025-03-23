import React, { useState } from 'react';
import { Layout, Menu, Row, Col, Typography, Divider } from 'antd';
import { Doctor } from '../../models/Doctor';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DoctorCard from './DoctorCard';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const specialties = [
  'Tim mạch',
  'Da liễu',
  'Nhi khoa',
  'Thần kinh',
  'Chỉnh hình',
  'Ung bướu',
];

const doctors: Doctor[] = [
  // Tim mạch
  {
    name: 'Bác sĩ Nguyễn Văn A',
    specialty: 'Tim mạch',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh về tim mạch.',
    fee: '2.000.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Lê Thị B',
    specialty: 'Tim mạch',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong chăm sóc sức khỏe tim mạch.',
    fee: '1.800.000 VNĐ',
    slots: ['1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    name: 'Bác sĩ Trần Văn C',
    specialty: 'Tim mạch',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị suy tim và cao huyết áp.',
    fee: '2.500.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Phạm Thị D',
    specialty: 'Tim mạch',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị rối loạn nhịp tim.',
    fee: '3.000.000 VNĐ',
    slots: ['2:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    name: 'Bác sĩ Hoàng Văn E',
    specialty: 'Tim mạch',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị bệnh mạch vành.',
    fee: '1.500.000 VNĐ',
    slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
  },

  // Da liễu
  {
    name: 'Bác sĩ Nguyễn Thị F',
    specialty: 'Da liễu',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị mụn và các bệnh về da.',
    fee: '1.200.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Trần Văn G',
    specialty: 'Da liễu',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong chăm sóc da và điều trị nám.',
    fee: '1.500.000 VNĐ',
    slots: ['1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    name: 'Bác sĩ Lê Thị H',
    specialty: 'Da liễu',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị viêm da cơ địa.',
    fee: '2.000.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Phạm Văn I',
    specialty: 'Da liễu',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh da mãn tính.',
    fee: '2.500.000 VNĐ',
    slots: ['2:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    name: 'Bác sĩ Hoàng Thị J',
    specialty: 'Da liễu',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị dị ứng da.',
    fee: '1.800.000 VNĐ',
    slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
  },

  // Nhi khoa
  {
    name: 'Bác sĩ Nguyễn Văn K',
    specialty: 'Nhi khoa',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong chăm sóc sức khỏe trẻ em.',
    fee: '1.500.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Trần Thị L',
    specialty: 'Nhi khoa',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh hô hấp ở trẻ.',
    fee: '1.200.000 VNĐ',
    slots: ['1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    name: 'Bác sĩ Lê Văn M',
    specialty: 'Nhi khoa',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh tiêu hóa ở trẻ.',
    fee: '2.000.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Phạm Thị N',
    specialty: 'Nhi khoa',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh truyền nhiễm ở trẻ.',
    fee: '2.500.000 VNĐ',
    slots: ['2:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    name: 'Bác sĩ Hoàng Văn O',
    specialty: 'Nhi khoa',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh dị ứng ở trẻ.',
    fee: '1.800.000 VNĐ',
    slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
  },

  // Thần kinh
  {
    name: 'Bác sĩ Nguyễn Văn P',
    specialty: 'Thần kinh',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh về thần kinh.',
    fee: '2.000.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Trần Thị Q',
    specialty: 'Thần kinh',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị đau đầu và mất ngủ.',
    fee: '1.800.000 VNĐ',
    slots: ['1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    name: 'Bác sĩ Lê Văn R',
    specialty: 'Thần kinh',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị rối loạn thần kinh thực vật.',
    fee: '2.500.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Phạm Thị S',
    specialty: 'Thần kinh',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị bệnh Parkinson.',
    fee: '3.000.000 VNĐ',
    slots: ['2:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    name: 'Bác sĩ Hoàng Văn T',
    specialty: 'Thần kinh',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị bệnh động kinh.',
    fee: '1.500.000 VNĐ',
    slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
  },

  // Chỉnh hình
  {
    name: 'Bác sĩ Nguyễn Văn U',
    specialty: 'Chỉnh hình',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh về xương khớp.',
    fee: '2.000.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Trần Thị V',
    specialty: 'Chỉnh hình',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị thoái hóa khớp.',
    fee: '1.800.000 VNĐ',
    slots: ['1:00 PM', '2:00 PM', '3:00 PM'],
  },
  {
    name: 'Bác sĩ Lê Văn W',
    specialty: 'Chỉnh hình',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị gãy xương và phục hồi chức năng.',
    fee: '2.500.000 VNĐ',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
  },
  {
    name: 'Bác sĩ Phạm Thị X',
    specialty: 'Chỉnh hình',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị viêm khớp dạng thấp.',
    fee: '3.000.000 VNĐ',
    slots: ['2:00 PM', '3:00 PM', '4:00 PM'],
  },
  {
    name: 'Bác sĩ Hoàng Văn Y',
    specialty: 'Chỉnh hình',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị đau lưng và thoát vị đĩa đệm.',
    fee: '1.500.000 VNĐ',
    slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
  },

  // Thêm các chuyên ngành khác tương tự...
];

const DoctorList: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Tim mạch');
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const filteredDoctors = doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={250} style={{ background: '#f0f2f5', padding: '20px' }}>
        <Title level={4} style={{ marginBottom: '20px' }}>
          Chuyên ngành
        </Title>
        <Menu
          mode="inline"
          defaultSelectedKeys={['Tim mạch']}
          onClick={(e) => setSelectedSpecialty(e.key)}
        >
          {specialties.map((specialty) => (
            <Menu.Item key={specialty}>{specialty}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: '20px', background: '#fff' }}>
        <Title level={3} style={{ marginBottom: '20px' }}>
          Danh sách bác sĩ: {selectedSpecialty}
        </Title>
        <Row gutter={[16, 16]}>
          {filteredDoctors.map((doctor) => (
            <Col key={doctor.name} span={8}>
              <DoctorCard
                doctor={doctor}
                onClick={() =>
                  navigate(`/doctor/${doctor.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`)
                }
              />
            </Col>
          ))}
        </Row>
        <Divider style={{ margin: '40px 0' }} />
        <Row style={{ marginTop: '40px', alignItems: 'center' }}>
          <Col span={12} style={{ textAlign: 'left', paddingRight: '20px' }}>
            <img
              src="https://via.placeholder.com/150"
              alt="Logo công ty"
              style={{
                marginBottom: '20px',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
              }}
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
      </Content>
    </Layout>
  );
};

export default DoctorList;
