import { GetToken } from '@/backend/feature/validate';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import { CheckChangeData, GenerateFileName } from '@/backend/feature/general';

import { HomePage } from '@/backend/routers';
import SystemMessage from '@/backend/messages/systemMessage';
import { ICardContent } from '@/backend/models/data/Content/ICard';
import { DefaultCardErrorMessage } from '@/backend/defaultData/content/card';
import { ICardError } from '@/backend/models/messages/content/ICardMessage';
import { ContentType } from '@/backend/globalVariable';
import CardMessage from '@/backend/messages/content/cardMessage';

//Thêm nội dung - Card
export async function AddCardContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: ICardContent,
  setError: React.Dispatch<React.SetStateAction<ICardError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }
  const error = DefaultCardErrorMessage();

  //Kiểm tra có nhập trường dữ liệu mặt trước
  if (!data.text && !data.image) {
    error.status = false;
    error.missingContent = CardMessage.MISING_BOTH_INFO;
    setError(error);
    return;
  }

  const path = `course/${courseID}/${unitID}/${taskID}/${contentID}`;
  //Đăng tải hình (Nếu có)
  if (data.file instanceof File) {
    const filePath = GenerateFileName(data.file, path, contentID, token);
    const uploadResult = await UploadImage(data.file, filePath);

    if (uploadResult === SystemMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.imageError = uploadResult;
      setError(error);
      return;
    }
    data.image = uploadResult;
  }

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
        contentType: ContentType.CARD,
        contentName: null,
        contentDescription: null,
        contentData: {
          text: data.text,
          image: data.image == '' ? null : data.image,
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
  DeleteImage(data.image);
  return;
}

//Chỉnh sửa nội dung - Card
export async function EditCardContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  editData: ICardContent,
  defaultData: ICardContent,
  setError: React.Dispatch<React.SetStateAction<ICardError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  const error = DefaultCardErrorMessage();

  //Kiểm tra có nhập trường dữ liệu mặt trước
  if (!editData.text && !editData.file) {
    error.status = false;
    error.missingContent = CardMessage.MISING_BOTH_INFO;
    setError(error);
    return;
  }

  const path = `course/${courseID}/${unitID}/${taskID}/${contentID}`;
  //Đăng tải hình (Nếu có)
  if (editData.file instanceof File) {
    const filePath = GenerateFileName(editData.file, path, contentID, token);
    const uploadResult = await UploadImage(editData.file, filePath);

    if (uploadResult === SystemMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.imageError = uploadResult;
      setError(error);
      return;
    }
    editData.image = uploadResult;
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [defaultData.text];
  const checkEdit = [editData.text];
  if (!CheckChangeData(checkDefault, checkEdit, [editData.image])) {
    DeleteImage(editData.image);
    return window.location.reload();
  }

  //Tiến hành cập nhật dữ liệu
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
        contentType: ContentType.CARD,
        contentName: null,
        contentDescription: null,
        contentData: {
          text: editData.text,
          image: editData.image == '' ? null : editData.image,
        },
      }),
    },
  );

  if (response.ok) {
    DeleteImage(defaultData.image);
    return window.location.reload();
  }

  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message ?? SystemMessage.SYSTEM_ERROR;
  DeleteImage(editData.image);
  setError(error);
  return;
}

//Xóa nội dung - Card
export async function DeleteCardContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: ICardContent,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/taskContent/delete?courseID=${courseID}&unitID=${unitID}&taskID=${taskID}&contentID=${contentID}&position=${data.position}`,
    {
      method: 'DELETE',
      cache: 'no-store',
      headers: { Authorization: `${token}` },
    },
  );

  if (response.ok) {
    DeleteImage(data.image);
  }

  return window.location.reload();
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ICardError>>,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  if (['file'].includes(data.target.name)) {
    const file = data.currentTarget.files ? data.currentTarget.files[0] : '';
    if (file) {
      setFieldValue(data.target.name, file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreview(reader.result);
        }
      };
    }
  } else {
    setFieldValue(data.target.name, data.target.value);
  }

  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (['text', 'file'].includes(data.target.name)) {
      newErrorState['missingContent'] = null;
      newErrorState[`${data.target.name}Error`] = null;
    }

    return newErrorState;
  });
}
