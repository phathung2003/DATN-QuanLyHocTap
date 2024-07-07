import ICategory from '@/backend/models/data/ICategory';
import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';
import { DefaultCategoryErrorValue } from '../defaultData/category';
import { UploadImage } from '@/backend/database/generalFeature';
import GlobalMessage from '@/backend/messages/gobalMessage';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import GradeMessage from '@/backend/messages/gradeMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';

//Thêm dữ liệu
export async function handelSubmit(
  data: ICategory,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  const error = DefaultCategoryErrorValue;
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Đăng tải hình
  let categoryImageLink: string | null = null;
  if (data.categoryImage instanceof File) {
    const filePath = `${data.categoryType.toLowerCase()}/${data.categoryImage.name}`;
    const uploadResult = await UploadImage(data.categoryImage, filePath);

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.categoryImageError = uploadResult;
      setError(error);
      return;
    }
    categoryImageLink = uploadResult;
  }

  //Đưa lên database
  switch (data.categoryType.toLowerCase()) {
    case 'subject':
      return AddSubject(data, categoryImageLink, token, setError);
    case 'grade':
      return AddGrade(data, categoryImageLink, token, setError);
  }
}

//Thêm lớp
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
  }
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
  }
}

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

//Tạo mã ID
export function ResetError(
  data: React.ChangeEvent<HTMLInputElement>,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  setFieldValue(data.target.name, data.target.value);
  setError((prev) => {
    const newErrorState = {
      ...prev,
      systemError: null,
    };
    if (['categoryName', 'categoryImage'].includes(data.target.name)) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}
