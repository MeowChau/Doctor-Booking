import React from 'react';
import { Row, Col, Button } from 'antd';

interface BookingSlotsProps {
  slots: string[];
  selectedSlot: string | null;
  onSlotSelect: (slot: string) => void;
}

const BookingSlots: React.FC<BookingSlotsProps> = ({ slots, selectedSlot, onSlotSelect }) => {
  return (
    <Row gutter={[16, 16]}>
      {slots.map((slot) => (
        <Col key={slot}>
          <Button
            type={selectedSlot === slot ? 'primary' : 'default'}
            size="large"
            style={{
              width: '120px',
              borderRadius: '8px',
              fontWeight: selectedSlot === slot ? 'bold' : 'normal',
            }}
            onClick={() => onSlotSelect(slot)}
          >
            {slot}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default BookingSlots;