import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { Doctor } from '../../models/Doctor';

const { Text } = Typography;

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
        {doctor.name} {/* Hiển thị tên bác sĩ */}
      </Text>
      <br />
      <Text strong style={{ fontSize: '16px', color: '#595959' }}>
        {doctor.specialty}
      </Text>
      <br />
      <Text type="secondary" style={{ fontSize: '14px' }}>
        {doctor.experience}
      </Text>
      <br />
      <Text>{doctor.about}</Text>
      <br />
      <Text strong style={{ fontSize: '16px' }}>
        Phí khám: {doctor.fee}
      </Text>
      <br />
      <div style={{ marginTop: '10px' }}>
        <Text strong>Giờ khám:</Text>
        <div style={{ marginTop: '5px' }}>
          {doctor.slots.map((slot) => (
            <Tag color="blue" key={slot}>
              {slot}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;