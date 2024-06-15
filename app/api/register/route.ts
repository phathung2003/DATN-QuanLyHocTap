import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { AddUser, CheckInfoExist } from '@/components/process/database/users';
import { IError } from '@/components/models/IRegister';
import { ErrorMessage } from '@/components/process/feature/register/registerErrorMessage';

export async function POST(request: Request) {
  const defaultErrorValue: IError = {
    status: true,
    usernameError: null,
    phoneNumberError: null,
    emailError: null,
    systemError: null,
  };

  try {
    const data = await request.json();
    const { name, username, phoneNumber } = data;

    //Kiểm tra tài khoản đã tồn tại chưa
    const result = await CheckInfoExist(data);
    if (result.status == false) {
      return new NextResponse(
        JSON.stringify({
          status: 409,
          message: 'Tài khoản đã tồn tại',
          errorMessage: result,
        }),
        {
          status: 409, // Thiết lập mã trạng thái HTTP phản hồi tại đây
          headers: {
            'Content-Type': 'application/json', // Đảm bảo đặt Content-Type phù hợp
          },
        },
      );
    }

    //Tài khoản chưa tồn tại --> Đăng ký
    let { email, password } = data;
    password = await bcrypt.hash(password, 10);
    if (email.trim().length === 0) {
      email = null;
    }
    AddUser(name, username, phoneNumber, email, password);

    return NextResponse.json(
      { message: 'User registered successfulnnly' },
      { status: 201 },
    );
  } catch (error) {
    //Lỗi xảy ra trong quá trình đăng ký
    defaultErrorValue.status = false;
    defaultErrorValue.systemError = ErrorMessage.SYSTEM_ERROR;

    return new NextResponse(
      JSON.stringify({
        message: 'Lỗi xảy ra trong quá trình đăng ký',
        errorMessage: defaultErrorValue,
      }),
      {
        status: 500, // Thiết lập mã trạng thái HTTP phản hồi tại đây
        headers: {
          'Content-Type': 'application/json', // Đảm bảo đặt Content-Type phù hợp
        },
      },
    );
  }
}
