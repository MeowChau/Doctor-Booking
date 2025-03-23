import React from 'react';
import { Card, Button, Row, Col, Typography, message } from 'antd';
import { Appointment } from '../../models/Appointment';

const { Paragraph } = Typography;

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onCancel }) => {
  return (
    <Card
      title={appointment.doctorName}
      bordered={false}
      style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      <Paragraph><strong>Chuyên ngành:</strong> {appointment.specialty}</Paragraph>
      <Paragraph><strong>Họ và tên:</strong> {appointment.fullName}</Paragraph>
      <Paragraph><strong>Số điện thoại:</strong> {appointment.phone}</Paragraph>
      <Paragraph><strong>Ngày khám:</strong> {appointment.date}</Paragraph>
      <Paragraph><strong>Giờ khám:</strong> {appointment.time}</Paragraph>
      {appointment.note && <Paragraph><strong>Ghi chú:</strong> {appointment.note}</Paragraph>}
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button type="primary" block onClick={() => message.success('Thanh toán online thành công!')}>
            Thanh toán online
          </Button>
        </Col>
        <Col span={12}>
          <Button type="default" danger block onClick={onCancel}>
            Hủy lịch khám
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default AppointmentCard;
