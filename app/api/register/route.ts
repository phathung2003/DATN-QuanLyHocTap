import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { AddUser, CheckInfoExist } from '@/components/process/database/users';
import { IRegisterDB, IError } from '@/components/models/IRegister';
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
    const dataInput = await request.json();
    //Kiểm tra tài khoản đã tồn tại chưa
    const result = await CheckInfoExist(dataInput);
    if (result.status == false) {
      return new NextResponse(
        JSON.stringify({
          status: 409,
          message: ErrorMessage.ACCOUNT_EXIST,
          errorMessage: result,
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    //Tài khoản chưa tồn tại --> Đăng ký
    const encodePassword = await bcrypt.hash(dataInput.password, 10);
    let emailInput = dataInput.email;
    if (dataInput.email.trim().length === 0) {
      emailInput = null;
    }

    const data: IRegisterDB = {
      name: dataInput.name,
      username: dataInput.username,
      phoneNumber: dataInput.phoneNumber,
      email: emailInput,
      password: encodePassword,
    };
    AddUser(data);

    return NextResponse.json(
      { message: ErrorMessage.REGISTER_COMPLETE },
      { status: 201 },
    );
  } catch (error) {
    //Lỗi xảy ra trong quá trình đăng ký
    defaultErrorValue.status = false;
    defaultErrorValue.systemError = ErrorMessage.SYSTEM_ERROR;

    return new NextResponse(
      JSON.stringify({
        message: ErrorMessage.SYSTEM_ERROR,
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
