'use server';
import { redirect } from 'next/navigation';

export async function PreviousPage() {
  redirect(`/`);
}
export async function HomePage() {
  redirect(`/`);
}

export async function LoginPage() {
  redirect(`/login`);
}
