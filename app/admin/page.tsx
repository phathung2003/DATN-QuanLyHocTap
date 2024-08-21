import { Metadata } from 'next';
import TrangChuAd from '@/components/Dashboard/TrangChuAd';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Trang chủ quản lý hệ thống',
};

export default function AdminHome() {
  return <TrangChuAd />;
}
