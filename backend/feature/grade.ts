import { IGrade } from '@/backend/models/data/IGrade';
import { IGradeError } from '@/backend/models/messages/IGradeMessage';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import { DefaultGradeErrorValue } from '@/backend/defaultData/grade';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import { createHash } from 'crypto';

import GlobalMessage from '@/backend/messages/gobalMessage';
import GradeMessage from '@/backend/messages/gradeMessage';

//Lấy cấp độ
export async function GetGrade() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/grade/list`,
    { method: 'GET' },
  );
  const info: IGrade[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Thêm cấp bậc
export async function AddGrade(
  data: IGrade,
  setError: React.Dispatch<React.SetStateAction<IGradeError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Đăng tải hình
  const error = DefaultGradeErrorValue;
  if (data.gradeFile instanceof File) {
    const uploadResult = await UploadImage(
      data.gradeFile,
      GenerateFileName(data.gradeFile, data.gradeName, token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.gradeFileError = uploadResult;
      setError(error);
      return;
    }
    data.gradeImage = uploadResult;
  }

  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/grade/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        gradeID: GenerateID(data.gradeName),
        gradeName: data.gradeName,
        gradeDescription: data.gradeDescription,
        gradeImage: !data.gradeImage ? null : data.gradeImage,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  } else {
    const errorData = await response.json();

    error.status = false;
    if (errorData.message == GradeMessage.GRADE_EXIST) {
      error.gradeNameError = errorData.message;
    } else {
      error.systemError = errorData.message;
    }
    setError(error);
    DeleteImage(data.gradeImage);
  }
}

//Chỉnh sửa cấp độ
export async function EditGrade(
  editData: IGrade,
  defaultData: IGrade,
  setError: React.Dispatch<React.SetStateAction<IGradeError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tải hình
  const error = DefaultGradeErrorValue;
  let gradeImageLink: string | null = null;
  if (editData.gradeFile instanceof File) {
    const uploadResult = await UploadImage(
      editData.gradeFile,
      GenerateFileName(editData.gradeFile, 'grade', token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.gradeFileError = uploadResult;
      setError(error);
      return;
    }
    gradeImageLink = uploadResult;
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [defaultData.gradeName, defaultData.gradeDescription];
  const checkEdit = [editData.gradeName, editData.gradeDescription];

  if (!ChangeData(checkDefault, checkEdit, gradeImageLink)) {
    DeleteImage(gradeImageLink);
    return window.location.reload();
  }

  //Tiến hành cập nhật dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/grade/edit?gradeID=${defaultData.gradeID}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        gradeID: GenerateID(editData.gradeName),
        gradeName: editData.gradeName,
        gradeDescription: editData.gradeDescription,
        gradeImage: gradeImageLink,
      }),
    },
  );

  if (response.ok) {
    DeleteImage(defaultData.gradeImage);
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  console.log(errorData.message);
  if (errorData.message == GradeMessage.GRADE_EXIST) {
    error.gradeNameError = errorData.message;
  } else {
    error.systemError = errorData.message;
  }
  setError(error);
  return;
}

//Xóa loại
export async function DeleteGrade(
  gradeID: string,
  setError: React.Dispatch<React.SetStateAction<IGradeError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tiến hành xóa loại
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/grade/delete?gradeID=${gradeID}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    },
  );

  //Xóa thành công
  if (response.ok) {
    return window.location.reload();
  }

  //Xóa thất bại
  const error = DefaultGradeErrorValue;
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<IGradeError>>,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  if (['gradeImage', 'gradeFile'].includes(data.target.name)) {
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
    if (
      ['gradeName', 'gradeDescription', 'gradeImage', 'gradeFile'].includes(
        data.target.name,
      )
    ) {
      newErrorState[`${data.target.name}Error`] = null;
    }

    return newErrorState;
  });
}

//Tạo tên hình
function GenerateFileName(image: File, type: string, ...data: string[]) {
  let streamFile = '';

  //Đọc file hình
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
      streamFile = reader.result;
    }
  };
  const combinedData = data.join('') + streamFile + new Date();

  const fileName = createHash('sha256').update(combinedData).digest('hex');
  return `${type.toLowerCase()}/${fileName}`;
}

//Tạo mã ID
function GenerateID(input: string | null) {
  // Normalize the string to remove accents
  if (input != null) {
    const normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace spaces with dashes and make lowercase
    const ID = normalized.replace(/\s+/g, '-').toLowerCase();
    return ID;
  }
  return null;
}

//Kiểm tra dữ liệu có chỉnh sửa hay không
function ChangeData(
  defaultData: (string | null)[],
  editData: (string | null)[],
  imageLink: string | null,
): boolean {
  //Kiểm tra dữ liệu có thay đổi không
  let change = false;
  for (let i = 0; i < defaultData.length; i++) {
    if (defaultData[i] != editData[i]) {
      change = true;
      break;
    }
  }
  return imageLink != null || change;
}
