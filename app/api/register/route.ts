import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { AddUser } from '@/components/process/database/users';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, username, phoneNumber } = data;
    let { email, password } = data;

    password = await bcrypt.hash(password, 10);
    if (email.trim().length === 0) {
      email = null;
    }
    AddUser(name, username, phoneNumber, email, password);
    console.log(name, username, phoneNumber, email, password);

    return NextResponse.json(
      { message: 'User registered successfulnnly' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 500 },
    );
  }
}
