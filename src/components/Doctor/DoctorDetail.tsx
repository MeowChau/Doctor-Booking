import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, Divider, Row, Col, Button, Modal, Form, Input, Rate, List, message, DatePicker, Select, Tag } from 'antd';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';
import moment from 'moment';
const { Option } = Select;

const { Title, Paragraph } = Typography;

const doctorData: Record<string, { name: string; specialty: string; experience: string; about: string; education?: string; workHistory?: string; slots?: string[]; image?: string; biography?: string }> = {
  'nguyen-van-a': {
    name: 'Bác sĩ Nguyễn Văn A',
    specialty: 'Tim mạch',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh về tim mạch.',
    education: 'Tốt nghiệp Đại học Y Hà Nội, chuyên ngành Tim mạch.',
    workHistory: 'Công tác tại Bệnh viện Bạch Mai từ năm 2010 đến nay.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
    image: 'https://via.placeholder.com/300',
    biography: `
      <strong>Trình độ:</strong> Phó giáo sư<br/>
      <strong>Vị trí quản lý:</strong> Nguyên Trưởng khoa Lao và Bệnh phổi, Viện Phổi Trung ương; Phó chủ nhiệm Bộ môn Nội Khoa Y, Trường Đại học Y dược - Đại học Quốc gia Hà Nội<br/>
      <strong>Số năm kinh nghiệm:</strong> Gần 40 năm<br/>
      <strong>Quá trình công tác:</strong><br/>
      - T10/1989 - T9/2003: Bác sĩ điều trị, Bệnh viện Phổi Trung ương.<br/>
      - T9/2003 - T5/2007: Phó Trưởng khoa Lao và Bệnh phổi, Bệnh viện phổi Trung ương.<br/>
      - T5/2007 - T2016: Trưởng khoa Lao và Bệnh phổi, Bệnh viện Phổi Trung ương.<br/>
      - 2016 - nay: Giảng viên bộ môn Nội, kiêm nhiệm bộ môn liên chuyên khoa - Khoa Y Dược - Đại học Quốc Gia Hà Nội.<br/>
      <strong>Quá trình học tập:</strong><br/>
      - 1980 - 1986: Bác sĩ Đa khoa Nội nhi, Đại học Y Hà Nội.<br/>
      - 1999: Thạc sĩ Y Khoa, Đại học Y Hà Nội.<br/>
      - 2010: Tiến sỹ y khoa, Đại học Y Hà Nội.<br/>
      - 2007: Khóa học về phương pháp nghiên cứu do Trung tâm kiểm soát bệnh tật của Mỹ (CDC - USA), Bệnh viện Phổi Trung ương.<br/>
      - 2003: Chuyên khoa định hướng Tim mạch, Viện Tim mạch Quốc gia.<br/>
      - 2015: Khóa đào tạo Kiểm soát Lao và các bệnh nhiễm trùng, Viện Nghiên cứu Lao của Nhật Bản.<br/>
      - 2008: Quản lý Nhà Nước: Chuyên viên Bộ Y Tế, Học viện Hành chính Quốc Gia.<br/>
      - 2009: Chương trình tiến Pháp cơ sở hệ tại chức 2 năm, Đại học Ngoại ngữ Hà Nội.<br/>
    `,
  },
  'le-thi-b': {
    name: 'Bác sĩ Lê Thị B',
    specialty: 'Tim mạch',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong chăm sóc sức khỏe tim mạch.',
    education: 'Tốt nghiệp Đại học Y Dược TP.HCM, chuyên ngành Nội khoa.',
    workHistory: 'Công tác tại Bệnh viện Chợ Rẫy từ năm 2015.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
    image: 'https://via.placeholder.com/300', // Đường dẫn ảnh bác sĩ
  },
  'tran-van-c': {
    name: 'Bác sĩ Trần Văn C',
    specialty: 'Tim mạch',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị suy tim và cao huyết áp.',
    education: 'Tốt nghiệp Đại học Y Hà Nội, chuyên ngành Nội khoa.',
    workHistory: 'Công tác tại Viện Tim mạch Quốc gia từ năm 2008.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'pham-thi-d': {
    name: 'Bác sĩ Phạm Thị D',
    specialty: 'Tim mạch',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị rối loạn nhịp tim.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'hoang-van-e': {
    name: 'Bác sĩ Hoàng Văn E',
    specialty: 'Tim mạch',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị bệnh mạch vành.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'nguyen-thi-f': {
    name: 'Bác sĩ Nguyễn Thị F',
    specialty: 'Da liễu',
    experience: '10 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị mụn và các bệnh về da.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'tran-van-g': {
    name: 'Bác sĩ Trần Văn G',
    specialty: 'Da liễu',
    experience: '8 năm kinh nghiệm',
    about: 'Chuyên gia trong chăm sóc da và điều trị nám.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'le-thi-h': {
    name: 'Bác sĩ Lê Thị H',
    specialty: 'Da liễu',
    experience: '12 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị viêm da cơ địa.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'pham-van-i': {
    name: 'Bác sĩ Phạm Văn I',
    specialty: 'Da liễu',
    experience: '15 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị các bệnh da mãn tính.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  'hoang-thi-j': {
    name: 'Bác sĩ Hoàng Thị J',
    specialty: 'Da liễu',
    experience: '7 năm kinh nghiệm',
    about: 'Chuyên gia trong điều trị dị ứng da.',
    slots: ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
  },
  // Thêm các bác sĩ khác từ danh sách...
};

const DoctorDetail: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const doctor = doctorId
    ? Object.values(doctorData).find((doc) =>
        doc.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '') === doctorId
      )
    : undefined;
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reviews, setReviews] = useState<{ email: string; rating: number; comment: string }[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const storedReviews = getFromLocalStorage(`reviews-${doctorId}`) || [];
    setReviews(storedReviews);

    const avgRating =
      storedReviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) /
      (storedReviews.length || 1);
    setAverageRating(avgRating);
  }, [doctorId]);

  const handleAddReview = (values: { rating: number; comment: string }) => {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
      message.error('Bạn cần đăng nhập để đánh giá!');
      return;
    }

    const newReview = {
      email: loggedInUserEmail,
      ...values,
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    saveToLocalStorage(`reviews-${doctorId}`, updatedReviews);

    const avgRating =
      updatedReviews.reduce((sum: number, review: { rating: number }) => sum + review.rating, 0) /
      updatedReviews.length;
    setAverageRating(avgRating);

    message.success('Đánh giá của bạn đã được lưu!');
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
      message.error('Bạn cần đăng nhập để đặt lịch!');
      return;
    }

    const appointments = getFromLocalStorage('appointments') || [];
    const selectedDate = values.date.format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');

    // Kiểm tra nếu ngày được chọn là trước ngày mai
    if (moment(selectedDate).isSameOrBefore(today)) {
      message.error('Bạn chỉ có thể đặt lịch khám từ ngày mai trở đi!');
      return;
    }

    // Kiểm tra nếu người dùng đã đặt lịch trong cùng ngày
    const hasAppointment = appointments.some(
      (appointment: any) =>
        appointment.date === selectedDate &&
        appointment.fullName === values.fullName &&
        appointment.email === loggedInUserEmail
    );

    if (hasAppointment) {
      message.error('Bạn chỉ được đặt lịch khám một lần trong một ngày!');
      return;
    }

    const newAppointment = {
      email: loggedInUserEmail,
      doctorName: doctor?.name || 'Bác sĩ không xác định',
      specialty: doctor?.specialty || 'Chuyên ngành không xác định',
      ...values,
      date: selectedDate,
    };

    saveToLocalStorage('appointments', [...appointments, newAppointment]);
    message.success('Đăng ký lịch khám thành công!');
    setIsModalVisible(false);
    setTimeout(() => navigate('/appointments'), 500); // Điều hướng đến trang "Lịch khám bệnh" sau 0.5 giây
  };

  if (!doctor) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Title level={3}>Không tìm thấy thông tin bác sĩ</Title>
        <Paragraph>Vui lòng kiểm tra lại đường dẫn hoặc chọn một bác sĩ khác từ danh sách.</Paragraph>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 80px' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card style={{ textAlign: 'center', padding: '20px' }}>
            <img
              src={doctor.image || 'https://via.placeholder.com/300'} // Hiển thị ảnh bác sĩ
              alt={doctor.name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
            />
            <Title level={4}>{doctor.name}</Title>
            <Paragraph><strong>Chuyên ngành:</strong> {doctor.specialty}</Paragraph>
            <Paragraph><strong>Đánh giá trung bình:</strong> <Rate disabled value={averageRating} /> ({averageRating.toFixed(1)})</Paragraph>
            <Paragraph>
              <strong>Giờ khám:</strong>
              <div style={{ marginTop: '5px' }}>
                {doctor.slots?.map((slot) => (
                  <Tag color="blue" key={slot}>
                    {slot}
                  </Tag>
                ))}
              </div>
            </Paragraph>
            <Button type="primary" size="large" style={{ marginTop: '20px', width: '100%' }} onClick={handleOpenModal}>
              Đặt lịch khám
            </Button>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <Title level={2}>{doctor.name}</Title>
            <Paragraph><strong>Chuyên ngành:</strong> {doctor.specialty}</Paragraph>
            <Paragraph><strong>Kinh nghiệm:</strong> {doctor.experience}</Paragraph>
            <Paragraph><strong>Giới thiệu:</strong> {doctor.about}</Paragraph>
            <Divider />
            <Title level={3}>Tiểu sử</Title>
            <div
              dangerouslySetInnerHTML={{
                __html: doctor.biography || 'Thông tin đang được cập nhật.',
              }}
            />
          </Card>
          <Divider />
          <Title level={3}>Đánh giá và nhận xét</Title>
          <List
            dataSource={reviews}
            renderItem={(review, index) => (
              <List.Item key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <Paragraph><strong>Email:</strong> {review.email}</Paragraph>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <Rate disabled value={review.rating} />
                </div>
                <div style={{ flex: 2, textAlign: 'right' }}>
                  <Paragraph>{review.comment}</Paragraph>
                </div>
              </List.Item>
            )}
          />
          <Divider />
          <Title level={4}>Thêm đánh giá của bạn</Title>
          <Form layout="vertical" onFinish={handleAddReview}>
            <Form.Item
              label="Đánh giá (sao)"
              name="rating"
              rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              label="Nhận xét"
              name="comment"
              rules={[{ required: true, message: 'Vui lòng nhập nhận xét!' }]}
            >
              <Input.TextArea rows={4} placeholder="Nhập nhận xét của bạn" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Gửi đánh giá
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* Modal for Booking Form */}
      <Modal
        title={`Đặt lịch khám với ${doctor.name}`}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item label="Ngày khám" name="date" rules={[{ required: true, message: 'Vui lòng chọn ngày khám!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Giờ khám" name="time" rules={[{ required: true, message: 'Vui lòng chọn giờ khám!' }]}>
            <Select placeholder="Chọn giờ khám">
              <Option value="9:00 AM">9:00 AM</Option>
              <Option value="10:00 AM">10:00 AM</Option>
              <Option value="11:00 AM">11:00 AM</Option>
              <Option value="1:00 PM">1:00 PM</Option>
              <Option value="2:00 PM">2:00 PM</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Nội dung yêu cầu" name="note">
            <Input.TextArea placeholder="Nhập nội dung yêu cầu" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đặt lịch
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorDetail;
