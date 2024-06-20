import { Blog } from '@/types/blog';

const blogData: Blog[] = [
  {
    id: 1,
    title: 'Các bé nhạy bén hơn khi được rèn luyện mỗi ngày',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.',
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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.',
    image: '/images/homepageuser/blog2.jpg',
    author: {
      name: 'Trần Minh Hoàng',
      image: '/images/users/user01.png',
      designation: 'Content Writer',
    },
    tags: ['nhiệt huyết'],
    publishDate: '2024',
  },
  {
    id: 3,
    title: 'Các bé nhạy bé hơn khi được rèn luyện mỗi ngày',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet dictum neque, laoreet dolor.',
    image: '/images/homepageuser/blog3.jpg',
    author: {
      name: 'Hằng Lê',
      image: '/images/users/user01.png',
      designation: 'Giảng viên cấp 1',
    },
    tags: ['đồng hành'],
    publishDate: '2024',
  },
];
export default blogData;
