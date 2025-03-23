import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, message } from 'antd';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { Appointment } from '../../models/Appointment';
import AppointmentCard from './AppointmentCard';

const { Title } = Typography;

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
      message.error('Bạn cần đăng nhập để xem lịch khám!');
      navigate('/account');
      return;
    }

    const storedAppointments = getFromLocalStorage('appointments') || [];
    const userAppointments = storedAppointments.filter(
      (appointment: { email: string }) => appointment.email === loggedInUserEmail
    );
    setAppointments(userAppointments);
  }, [navigate]);

  const handleCancelAppointment = (index: number) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
    saveToLocalStorage('appointments', updatedAppointments);
    message.success('Hủy lịch khám thành công!');
  };

  return (
    <div style={{ padding: '40px 80px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Lịch khám bệnh
      </Title>
      <Row gutter={[16, 16]}>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <Col span={8} key={index}>
              <AppointmentCard
                appointment={appointment}
                onCancel={() => handleCancelAppointment(index)}
              />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Typography.Text style={{ fontSize: '16px', color: '#555' }}>
              Hiện tại không có lịch khám nào.
            </Typography.Text>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Appointments;
