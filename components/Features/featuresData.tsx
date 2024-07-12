import { Feature } from '@/types/feature';

//Icon
import DashboardIcon from '@/public/vector/dashboard-pink.svg';
import BookIcon from '@/public/vector/book-pink.svg';
import GridIcon from '@/public/vector/grid-pink.svg';
import GearIcon from '@/public/vector/gear-pink.svg';
import SheetIcon from '@/public/vector/sheet-pink.svg';
import ForumIcon from '@/public/vector/forum-pink.svg';

const FeaturesData: Feature[] = [
  {
    id: 1,
    icon: <DashboardIcon />,
    title: 'Bảng điều khiển của PH',
    paragraph:
      'Một giao diện tổng quan cho phép phụ huynh theo dõi tiến độ học tập, điểm số, và các hoạt động gần đây của bé.',
  },
  {
    id: 2,
    icon: <BookIcon />,
    title: 'Lịch học và bài tập',
    paragraph:
      'Giúp phụ huynh và bé tổ chức thời gian học tập hiệu quả, tránh bỏ lỡ các nhiệm vụ quan trọng.',
  },
  {
    id: 3,
    icon: <GridIcon />,
    title: 'Hệ thống giao và chấm bài trực tuyến',
    paragraph:
      'Phụ huynh có thể giao bài tập trực tuyến, có thể kiểm tra và bé có thể nộp bài tập qua hệ thống. Tính năng chấm điểm tự động và phản hồi cũng được tích hợp.',
  },
  {
    id: 4,
    icon: <GearIcon />,
    title: 'Báo cáo chi tiết và phân tích học tập',
    paragraph:
      'Phụ huynh nhận được thông tin chi tiết về tiến độ học tập của con, từ đó có thể hỗ trợ bé kịp thời và hiệu quả hơn.',
  },
  {
    id: 5,
    icon: <SheetIcon />,
    title: 'Tài liệu học tập phong phú',
    paragraph:
      'Cung cấp cho bé nguồn học liệu phong phú để hỗ trợ quá trình học tập, giúp bé tự học và nâng cao kiến thức ngoài giờ học chính khóa',
  },
  {
    id: 6,
    icon: <ForumIcon />,
    title: 'Diễn đàn và hỗ trợ cộng đồng',
    paragraph:
      'Tạo ra một cộng đồng hỗ trợ lẫn nhau, nơi phụ huynh có thể tìm kiếm lời khuyên và hỗ trợ từ những người có cùng mối quan tâm.',
  },
];
export default FeaturesData;
