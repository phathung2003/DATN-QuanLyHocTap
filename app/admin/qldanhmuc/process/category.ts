import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';
import { DefaultCategoryErrorValue } from '@/backend/defaultData/category';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import { ISubject } from '@/backend/models/data/ISubject';
import { createHash } from 'crypto';
import { IGrade } from '@/backend/models/data/IGrade';

import ICategory from '@/backend/models/data/ICategory';
import GlobalMessage from '@/backend/messages/gobalMessage';
import GradeMessage from '@/backend/messages/gradeMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';

//Thêm loại
export async function handelSubmit(
  data: ICategory,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Đăng tải hình
  const error = DefaultCategoryErrorValue;
  let categoryImageLink: string | null = null;
  if (data.categoryImage instanceof File) {
    const uploadResult = await UploadImage(
      data.categoryImage,
      GenerateFileName(data.categoryImage, data.categoryType, token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.categoryImageError = uploadResult;
      setError(error);
      return;
    }
    categoryImageLink = uploadResult;
  }

  //Đưa lên cơ sở dữ liệu
  switch (data.categoryType.toLowerCase()) {
    case 'subject':
      return AddSubject(data, categoryImageLink, token, setError);
    case 'grade':
      return AddGrade(data, categoryImageLink, token, setError);
  }
}

//Xóa loại
export async function DeleteCategory(
  categoryID: string,
  type: string,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tiến hành xóa loại
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${type}/delete?${type.toLowerCase() === 'subject' ? 'subjectID' : 'gradeID'}=${categoryID}`,
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
  const error = DefaultCategoryErrorValue;
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Thêm môn
async function AddSubject(
  data: ICategory,
  imageURL: string | null,
  token: string,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subject/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        subjectID: GenerateID(data.categoryName),
        subjectName: data.categoryName,
        subjectDescription: data.categoryDescription,
        subjectImage: imageURL,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  } else {
    const error = DefaultCategoryErrorValue;
    const errorData = await response.json();
    error.status = false;
    console.log(errorData.message);
    if (errorData.message == SubjectMessage.SUBJECT_EXIST) {
      error.categoryNameError = errorData.message;
    } else {
      error.systemError = errorData.message;
    }
    setError(error);

    //Xóa hình đã upload
    DeleteImage(imageURL);
  }
}

//Chỉnh sửa môn học
export async function EditSubject(
  editData: ISubject,
  defaultData: ISubject,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tải hình
  const error = DefaultCategoryErrorValue;
  let subjectImageLink: string | null = null;
  if (editData.subjectFile instanceof File) {
    const uploadResult = await UploadImage(
      editData.subjectFile,
      GenerateFileName(editData.subjectFile, 'subject', token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.categoryImageError = uploadResult;
      setError(error);
      return;
    }
    subjectImageLink = uploadResult;
  }

  //Có sự thay đổi dữ liệu
  const checkDefault = [
    defaultData.subjectName,
    defaultData.subjectDescription,
  ];
  const checkEdit = [editData.subjectName, editData.subjectDescription];
  if (!ChangeData(checkDefault, checkEdit, subjectImageLink)) {
    DeleteImage(subjectImageLink);
    return window.location.reload();
  }

  //Tiến hành chỉnh sửa dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/subject/edit?subjectID=${defaultData.subjectID}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        subjectID: GenerateID(editData.subjectName),
        subjectName: editData.subjectName,
        subjectDescription: editData.subjectDescription,
        subjectImage: subjectImageLink,
      }),
    },
  );

  if (response.ok) {
    DeleteImage(defaultData.subjectImage);
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  console.log(errorData.message);
  if (errorData.message == SubjectMessage.SUBJECT_EXIST) {
    error.categoryNameError = errorData.message;
  } else {
    error.systemError = errorData.message;
  }
  setError(error);
  return;
}

//Thêm cấp độ
async function AddGrade(
  data: ICategory,
  imageURL: string | null,
  token: string,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/grade/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        gradeID: GenerateID(data.categoryName),
        gradeName: data.categoryName,
        gradeDescription: data.categoryDescription,
        gradeImage: imageURL,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  } else {
    const error = DefaultCategoryErrorValue;
    const errorData = await response.json();

    error.status = false;
    if (errorData.message == GradeMessage.GRADE_EXIST) {
      error.categoryNameError = errorData.message;
    } else {
      error.systemError = errorData.message;
    }
    setError(error);
    DeleteImage(imageURL);
  }
}

//Chỉnh sửa cấp độ
export async function EditGrade(
  editData: IGrade,
  defaultData: IGrade,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tải hình
  const error = DefaultCategoryErrorValue;
  let gradeImageLink: string | null = null;
  if (editData.gradeFile instanceof File) {
    const uploadResult = await UploadImage(
      editData.gradeFile,
      GenerateFileName(editData.gradeFile, 'grade', token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.categoryImageError = uploadResult;
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/grade/edit?gradeID=${defaultData.gradeID}`,
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
  if (errorData.message == SubjectMessage.SUBJECT_EXIST) {
    error.categoryNameError = errorData.message;
  } else {
    error.systemError = errorData.message;
  }
  setError(error);
  return;
}

//----------- Nội bộ -----------//

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  if (
    ['categoryImage', 'subjectFile', 'gradeFile'].includes(data.target.name)
  ) {
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
    if (['Name', 'Image'].includes(data.target.name.replace(/^category/, ''))) {
      newErrorState[
        `category${data.target.name.replace(/^category/, '')}Error`
      ] = null;
    }

    return newErrorState;
  });
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
