import { GetToken } from '@/backend/feature/user/validate';
import { HomePage } from '@/backend/routers';
import { ContentType } from '@/backend/globalVariable';
import { IFlashcardError } from '@/backend/models/messages/content/IFlashcardMessage';
import { IFlashcardContent } from '@/backend/models/data/Content/IFlashcard';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import { DefaultFlashcardErrorMessage } from '@/backend/defaultData/content/flashcard';
import { CheckChangeData, GenerateFileName } from '@/backend/feature/general';

import SystemMessage from '@/backend/messages/systemMessage';
import FlashcardMessage from '@/backend/messages/content/flashcardMessage';

//Thêm nội dung - Flashcard
export async function AddFlashcardContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: IFlashcardContent,
  setError: React.Dispatch<React.SetStateAction<IFlashcardError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }
  const error = DefaultFlashcardErrorMessage();

  //Kiểm tra có nhập trường dữ liệu mặt trước
  if (!data.firstSideFile && !data.firstSideText) {
    error.status = false;
    error.firstSideMissingContent = FlashcardMessage.MISING_BOTH_INFO;
  }
  if (!data.secondSideFile && !data.secondSideText) {
    error.status = false;
    error.secondSideMissingContent = FlashcardMessage.MISING_BOTH_INFO;
  }
  if (!error.status) {
    setError(error);
    return;
  }

  const path = `course/${courseID}/${unitID}/${taskID}/${contentID}`;
  //Đăng tải hình - Mặt trước (Nếu có)
  if (data.firstSideFile instanceof File) {
    const filePath = GenerateFileName(
      data.firstSideFile,
      path,
      contentID,
      token,
    );

    const uploadResult = await UploadImage(data.firstSideFile, filePath);

    if (uploadResult === SystemMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.firstSideImageError = uploadResult;
    }
    data.firstSideImage = uploadResult;
  }

  //Đăng tải hình - Mặt sau (Nếu có)
  if (data.secondSideFile instanceof File) {
    const filePath = GenerateFileName(
      data.secondSideFile,
      path,
      contentID,
      token,
    );
    const uploadResult = await UploadImage(data.secondSideFile, filePath);

    if (uploadResult === SystemMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.secondSideImageError = uploadResult;
    }
    data.secondSideImage = uploadResult;
  }

  if (!error.status) {
    if (error.firstSideImageError) {
      DeleteImage(data.secondSideImage);
    } else if (error.secondSideImageError) {
      DeleteImage(data.firstSideImage);
    }
    setError(error);
    return;
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
        contentType: ContentType.FLASHCARD,
        contentName: null,
        contentDescription: null,
        contentData: {
          firstSideText: data.firstSideText,
          firstSideImage:
            data.firstSideImage == '' ? null : data.firstSideImage,
          secondSideText: data.secondSideText,
          secondSideImage:
            data.secondSideImage == '' ? null : data.secondSideImage,
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
  DeleteImage(data.secondSideImage);
  DeleteImage(data.firstSideImage);
  return;
}

//Chỉnh sửa nội dung - Flashcard
export async function EditFlashcardContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  editData: IFlashcardContent,
  defaultData: IFlashcardContent,
  setError: React.Dispatch<React.SetStateAction<IFlashcardError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  const error = DefaultFlashcardErrorMessage();

  //Kiểm tra có nhập trường dữ liệu mặt trước
  if (!editData.firstSideFile && !editData.firstSideText) {
    error.status = false;
    error.firstSideMissingContent = FlashcardMessage.MISING_BOTH_INFO;
  }
  if (!editData.secondSideFile && !editData.secondSideText) {
    error.status = false;
    error.secondSideMissingContent = FlashcardMessage.MISING_BOTH_INFO;
  }
  if (!error.status) {
    setError(error);
    return;
  }

  const path = `course/${courseID}/${unitID}/${taskID}/${contentID}`;

  //Đăng tải hình - Mặt trước (Nếu có)
  if (editData.firstSideFile instanceof File) {
    const filePath = GenerateFileName(
      editData.firstSideFile,
      path,
      contentID,
      token,
    );

    const uploadResult = await UploadImage(editData.firstSideFile, filePath);

    if (uploadResult === SystemMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.firstSideImageError = uploadResult;
    }
    editData.firstSideImage = uploadResult;
  }

  //Đăng tải hình - Mặt sau (Nếu có)
  if (editData.secondSideFile instanceof File) {
    const filePath = GenerateFileName(
      editData.secondSideFile,
      path,
      contentID,
      token,
    );
    const uploadResult = await UploadImage(editData.secondSideFile, filePath);

    if (uploadResult === SystemMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.secondSideImageError = uploadResult;
    }
    editData.secondSideImage = uploadResult;
  }

  if (!error.status) {
    if (error.firstSideImageError) {
      DeleteImage(editData.secondSideImage);
    } else if (error.secondSideImageError) {
      DeleteImage(editData.firstSideImage);
    }
    setError(error);
    return;
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [defaultData.firstSideText, defaultData.secondSideText];
  const checkEdit = [editData.firstSideText, editData.secondSideText];
  if (
    !CheckChangeData(checkDefault, checkEdit, [
      editData.firstSideImage,
      editData.secondSideImage,
    ])
  ) {
    DeleteImage(editData.firstSideImage);
    DeleteImage(editData.secondSideImage);
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
        contentType: ContentType.FLASHCARD,
        contentName: null,
        contentDescription: null,
        contentData: {
          firstSideText: editData.firstSideText,
          firstSideImage:
            editData.firstSideImage == '' ? null : editData.firstSideImage,
          secondSideText: editData.secondSideText,
          secondSideImage:
            editData.secondSideImage == '' ? null : editData.secondSideImage,
        },
      }),
    },
  );

  if (response.ok) {
    DeleteImage(defaultData.firstSideImage);
    DeleteImage(defaultData.secondSideImage);
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message ?? SystemMessage.SYSTEM_ERROR;
  DeleteImage(editData.secondSideImage);
  DeleteImage(editData.firstSideImage);
  setError(error);
  return;
}

//Xóa nội dung - Flashcard
export async function DeleteFlashcardContent(
  courseID: string,
  unitID: string,
  taskID: string,
  contentID: string,
  data: IFlashcardContent,
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
    DeleteImage(data.secondSideImage);
    DeleteImage(data.firstSideImage);
  }

  return window.location.reload();
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<IFlashcardError>>,
  setFirstPreview: React.Dispatch<React.SetStateAction<string | null>>,
  setSecondPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  if (['firstSideFile', 'secondSideFile'].includes(data.target.name)) {
    const file = data.currentTarget.files ? data.currentTarget.files[0] : '';
    if (file) {
      setFieldValue(data.target.name, file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (['firstSideFile'].includes(data.target.name)) {
            setFirstPreview(reader.result);
          }
          if (['secondSideFile'].includes(data.target.name)) {
            setSecondPreview(reader.result);
          }
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
    if (['firstSideText', 'firstSideFile'].includes(data.target.name)) {
      newErrorState['firstSideMissingContent'] = null;
    }
    if (['secondSideText', 'secondSideFile'].includes(data.target.name)) {
      newErrorState['secondSideMissingContent'] = null;
    }
    if (
      [
        'firstSideText',
        'firstSideFile',
        'secondSideText',
        'secondSideFile',
      ].includes(data.target.name)
    ) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}
