import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Menu } from 'antd';

const { Title, Paragraph } = Typography;

const DiseaseDetail: React.FC = () => {
  const { diseaseId } = useParams();
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const diseaseContent: Record<string, Record<string, string>> = {
    'benh-tim-mach': {
      overview: 'Bệnh tim mạch là một nhóm các bệnh liên quan đến tim và mạch máu, bao gồm nhồi máu cơ tim, đột quỵ và suy tim.',
      symptoms: 'Các triệu chứng bao gồm đau ngực, khó thở, mệt mỏi và nhịp tim không đều.',
      causes: 'Nguyên nhân chính bao gồm huyết áp cao, cholesterol cao, hút thuốc và lối sống ít vận động.',
      diagnosis: 'Phương pháp chẩn đoán bao gồm điện tâm đồ, siêu âm tim và xét nghiệm máu.',
      lifestyle: 'Chế độ sinh hoạt bao gồm ăn uống lành mạnh, tập thể dục đều đặn và tránh căng thẳng.',
    },
    'tieu-duong': {
      overview: 'Tiểu đường là một bệnh mãn tính xảy ra khi cơ thể không sản xuất đủ insulin hoặc không sử dụng insulin hiệu quả.',
      symptoms: 'Các triệu chứng bao gồm khát nước, tiểu nhiều, mệt mỏi và giảm cân không rõ nguyên nhân.',
      causes: 'Nguyên nhân bao gồm yếu tố di truyền, béo phì và lối sống không lành mạnh.',
      diagnosis: 'Chẩn đoán thông qua xét nghiệm đường huyết lúc đói và xét nghiệm HbA1c.',
      lifestyle: 'Chế độ sinh hoạt bao gồm kiểm soát chế độ ăn uống, tập thể dục và theo dõi đường huyết thường xuyên.',
    },
    'ung-thu': {
      overview: 'Ung thư là một nhóm bệnh liên quan đến sự phát triển không kiểm soát của các tế bào bất thường trong cơ thể.',
      symptoms: 'Các triệu chứng bao gồm khối u, giảm cân không rõ nguyên nhân, mệt mỏi và đau kéo dài.',
      causes: 'Nguyên nhân bao gồm yếu tố di truyền, hút thuốc, tiếp xúc với hóa chất độc hại và nhiễm trùng.',
      diagnosis: 'Chẩn đoán thông qua sinh thiết, chụp CT và xét nghiệm máu.',
      lifestyle: 'Chế độ sinh hoạt bao gồm ăn uống lành mạnh, tránh tiếp xúc với chất gây ung thư và kiểm tra sức khỏe định kỳ.',
    },
    // Thêm nội dung cho các bệnh khác tương tự...
  };

  const menuItems = [
    { key: 'overview', label: 'Tìm hiểu chung' },
    { key: 'symptoms', label: 'Triệu chứng' },
    { key: 'causes', label: 'Nguyên nhân' },
    { key: 'diagnosis', label: 'Phương pháp chẩn đoán & điều trị' },
    { key: 'lifestyle', label: 'Chế độ sinh hoạt' },
  ];

  const content = diseaseContent[diseaseId || '']?.[selectedMenu] || 'Nội dung đang được cập nhật.';

  return (
    <div style={{ padding: '20px 50px' }}>
      <Title level={2}>{diseaseId?.replace(/-/g, ' ')}</Title>
      <Menu
        mode="horizontal"
        items={menuItems}
        defaultSelectedKeys={['overview']}
        onClick={(e) => setSelectedMenu(e.key)}
      />
      <div style={{ marginTop: '20px' }}>
        <Paragraph>{content}</Paragraph>
      </div>
    </div>
  );
};

export default DiseaseDetail;
