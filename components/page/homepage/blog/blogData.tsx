import { Blog } from '@/types/blog';

const blogData: Blog[] = [
  {
    id: 1,
    title: 'Các bé nhạy bén hơn khi được rèn luyện mỗi ngày',
    paragraph:
      'Việc duy trì thói quen học tập hàng ngày không chỉ giúp các bé phát triển khả năng tư duy mà còn tăng cường sự tự tin và khả năng giải quyết vấn đề.',
    image: '/images/homepageuser/blog1.jpg',
    author: {
      name: 'Nguyễn Minh',
      image: '/images/users/user01.png',
      designation: 'Giảng viên mầm non',
    },
    tags: ['sáng tạo'],
    publishDate: '2024',
  },
  {
    id: 2,
    title: 'Được hỗ trợ nhiệt tình từ đội ngũ tâm huyết',
    paragraph:
      'Với sự tâm huyết đến từ đội ngũ nhân viên tâm huyết của hệ thống tạo nên 1 môi trường rất bổ ích cho các bé đồng thời hỗ trợ rất linh hoạt cho phụ huynh',
    image: '/images/homepageuser/blog2.jpg',
    author: {
      name: 'Trần Minh Hoàng',
      image: '/images/users/user01.png',
      designation: 'Người viết bài',
    },
    tags: ['nhiệt huyết'],
    publishDate: '2024',
  },
  {
    id: 3,
    title: 'Các bé nhạy bé hơn khi được rèn luyện mỗi ngày',
    paragraph:
      'Việc duy trì thói quen học tập hàng ngày không chỉ giúp các bé phát triển khả năng tư duy mà còn tăng cường sự tự tin và khả năng giải quyết vấn đề.',
    image: '/images/homepageuser/blog3.jpg',
    author: {
      name: 'Hằng Lê',
      image: '/images/users/user01.png',
      designation: 'Giảng viên mầm non',
    },
    tags: ['đồng hành'],
    publishDate: '2024',
  },
];
export default blogData;
