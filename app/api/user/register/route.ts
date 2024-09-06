import { NextResponse } from 'next/server';
import { AddUser, CheckInfoExist } from '@/backend/database/users';
import { IRegisterDB } from '@/backend/models/data/IRegister';
import bcrypt from 'bcrypt';
import { DefaultRegisteErrorValue } from '@/backend/defaultData/register';
import { Role } from '@/backend/globalVariable';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import SystemMessage from '@/backend/messages/systemMessage';
import RegisterMessage from '@/backend/messages/registerMessage';
import APIMessage from '@/backend/messages/apiMessage';
import { CheckEmail, CheckPhone } from '@/backend/database/generalFeature';

export async function POST(request: Request) {
  try {
    const dataInput = await request.json(); // Read the body here

    if (!IsInputValid(dataInput)) {
      const error = CheckError(dataInput);
      return new NextResponse(
        JSON.stringify({
          message: APIMessage.WRONG_INPUT,
          errorMessage: error,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    // Check if the account already exists
    const result = await CheckInfoExist(dataInput);
    if (result.status === false) {
      return new NextResponse(
        JSON.stringify({
          message: RegisterMessage.ACCOUNT_EXIST,
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

    // Account doesn't exist --> Register
    let passwordSave = dataInput.password;
    if (dataInput.password) {
      passwordSave = await bcrypt.hash(dataInput.password, 10);
    }

    const data: IRegisterDB = {
      name: dataInput.name,
      username: dataInput.username,
      phoneNumber: dataInput.phoneNumber,
      email: dataInput.email ? dataInput.email.trim() : null,
      password: passwordSave,
      role: Role.USER,
    };

    await AddUser(data);
    return MessageReturnOnly(RegisterMessage.REGISTER_COMPLETED, 201);
  } catch (e) {
    console.log(e);
    const error = DefaultRegisteErrorValue();
    error.status = false;
    error.systemError = SystemMessage.SYSTEM_ERROR;

    return new NextResponse(
      JSON.stringify({
        message: SystemMessage.SYSTEM_ERROR,
        errorMessage: error,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

function IsInputValid(data: any) {
  return (
    typeof data.name === 'string' &&
    data.name.trim() !== '' &&
    typeof data.username === 'string' &&
    data.username.trim() !== '' &&
    typeof data.phoneNumber === 'string' &&
    data.phoneNumber.trim() !== '' &&
    CheckPhone(data.phoneNumber.trim()) &&
    typeof data.email === 'string' &&
    data.email.trim() !== '' &&
    CheckEmail(data.email) &&
    typeof data.password === 'string' &&
    data.password.trim() !== ''
  );
}

function CheckError(data: any) {
  const error = DefaultRegisteErrorValue();

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    error.status = false;
    error.nameError = RegisterMessage.NAME.REQUIRED;
  }
  if (
    !data.username ||
    typeof data.username !== 'string' ||
    data.username.trim() === ''
  ) {
    error.status = false;
    error.usernameError = RegisterMessage.USERNAME.REQUIRED;
  }
  if (
    !data.phoneNumber ||
    typeof data.phoneNumber !== 'string' ||
    data.phoneNumber.trim() === ''
  ) {
    error.status = false;
    error.phoneNumberError = RegisterMessage.PHONE_NUMBER.REQUIRED;
  }
  if (!CheckPhone(data.phoneNumber.trim())) {
    error.status = false;
    error.phoneNumberError =
      RegisterMessage.PHONE_NUMBER.HAVE_BANNED_CHARACTERS;
  }
  if (
    !data.email ||
    typeof data.email !== 'string' ||
    data.email.trim() === ''
  ) {
    error.status = false;
    error.emailError = RegisterMessage.EMAIL.REQUIRED;
  }
  if (!CheckEmail(data.email)) {
    error.status = false;
    error.emailError = RegisterMessage.EMAIL.WRONG_EMAIL_FORMAT;
  }
  if (
    !data.password ||
    typeof data.password !== 'string' ||
    data.password.trim() === ''
  ) {
    error.status = false;
    error.passwordError = RegisterMessage.PASSWORD.REQUIRED;
  }

  if (!error.status) {
    return {
      data: error,
    };
  }
  return {
    data: error,
  };
}
