'use server';
import { redirect } from 'next/navigation';

export async function PreviousPage() {
  redirect(`/`);
}
export async function HomePage() {
  redirect(`/`);
}

export async function CategoryManager() {
  redirect(`/admin/qldanhmuc`);
}

export async function CourseManager() {
  redirect(`/admin/course`);
}

export async function CourseDetail(id) {
  redirect(`/admin/course/${id}`);
}

export async function LoginPage() {
  redirect(`/login`);
}
