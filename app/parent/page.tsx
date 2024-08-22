import { Metadata } from 'next';
import TrangChuPH from '@/components/PhuHuynh/TrangChuPH';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ người dùng',
};

export default function ParentHome() {
  return (
    <div>
      <TrangChuPH />
    </div>
  );
}
