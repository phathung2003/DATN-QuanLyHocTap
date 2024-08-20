import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import { ContentType } from '@/backend/globalVariable';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { DefaultCalculate_Two_NumberError } from '@/backend/defaultData/content/calculate_Two_Number';
import { ICalculate_Two_NumberError } from '@/backend/models/messages/content/ICalculate_Two_NumberMessage';
import { CheckChangeData } from '@/backend/feature/general';
import SystemMessage from '@/backend/messages/systemMessage';

//Thêm nội dung - Flashcard
export async function AddCalculate_Two_Number(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: ICalculateTwoNumbersContent,
  setError: React.Dispatch<React.SetStateAction<ICalculate_Two_NumberError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  const error = DefaultCalculate_Two_NumberError();
  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/add?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}&contentID=${contentID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        cache: 'no-store',
      },
      body: JSON.stringify({
        contentType: ContentType.CALCULATE_TWO_NUMBER,
        contentName: null,
        contentDescription: null,
        contentData: {
          firstNumber: Number(data.firstNumber),
          secondNumber: Number(data.secondNumber),
          operator: data.operator,
        },
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Chỉnh sửa nội dung - Flashcard
export async function EditCalculate_Two_Number(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  editData: ICalculateTwoNumbersContent,
  defaultData: ICalculateTwoNumbersContent,
  setError: React.Dispatch<React.SetStateAction<ICalculate_Two_NumberError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [
    defaultData.firstNumber,
    defaultData.secondNumber,
    defaultData.operator,
  ];
  const checkEdit = [
    editData.firstNumber,
    editData.secondNumber,
    editData.operator,
  ];
  if (!CheckChangeData(checkDefault, checkEdit, null)) {
    return;
  }

  const error = DefaultCalculate_Two_NumberError();
  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/edit?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}&contentID=${contentID}&position=${defaultData.position}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        cache: 'no-store',
      },
      body: JSON.stringify({
        contentType: ContentType.CALCULATE_TWO_NUMBER,
        contentName: null,
        contentDescription: null,
        contentData: {
          firstNumber: Number(editData.firstNumber),
          secondNumber: Number(editData.secondNumber),
          operator: editData.operator,
        },
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message ?? SystemMessage.SYSTEM_ERROR;
  setError(error);
  return;
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ICalculate_Two_NumberError>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  setFieldValue(data.target.name, data.target.value);
  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (
      ['firstNumber', 'secondNumber', 'operator'].includes(data.target.name)
    ) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}

//Phát nhạc đúng/sai
export function PlayAnswerSoundEffect(isCorrect: boolean) {
  const audio = new Audio(
    `/audio/${isCorrect ? 'correctAnswer' : 'wrongAnswer'}.wav`,
  );
  audio.play();
}

//Phát nhạc chúc mừng
export function PlayEndingSoundEffect(isWinning) {
  const filePath = isWinning ? `/audio/endingWin.wav` : `/audio/endingLost.wav`;
  const audio = new Audio(filePath);
  audio.play();
}

//Phát nhạc mở đầu
export function PlayOpeningSoundEffect() {
  const audio = new Audio(`/audio/opening.wav`);
  audio.play();
}

export async function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const FormatTime = (time) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = Math.floor(time / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

  if (Math.floor(time / 3600)) {
    return `${getHours}:${getMinutes}:${getSeconds}`;
  }
  return `${getMinutes}:${getSeconds}`;
};
