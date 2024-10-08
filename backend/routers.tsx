'use server';
import { redirect } from 'next/navigation';

export async function HomePage() {
  redirect(`/`);
}

export async function UserPage() {
  redirect(`/parent`);
}

export async function AdminPage() {
  redirect(`/admin`);
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

export async function UnitDetail(courseID, unitID) {
  redirect(`/admin/course/${courseID}/unit/${unitID}`);
}

export async function LoginPage() {
  redirect(`/login`);
}

export async function CustomURL(url) {
  redirect(url);
}

export async function ChatRoom(id) {
  redirect(`/admin/support/${id}`);
}
