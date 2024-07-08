import ICategory from '@/backend/models/data/ICategory';
import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';
import { DefaultCategoryErrorValue } from '../defaultData/category';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import GlobalMessage from '@/backend/messages/gobalMessage';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import GradeMessage from '@/backend/messages/gradeMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';
import { ISubject } from '@/backend/models/data/ISubject';
import { createHash } from 'crypto';

//Thêm dữ liệu
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

    if (imageURL != null) {
      DeleteImage(imageURL);
    }
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

    //Xóa hình đã upload
    if (imageURL != null) {
      DeleteImage(imageURL);
    }
  }
}

//Xóa môn học
export async function DeleteCategory(
  categoryID: string,
  type: string,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

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
  } else {
    const error = DefaultCategoryErrorValue;
    const errorData = await response.json();
    error.status = false;
    error.systemError = errorData.message;
    setError(error);
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

  const error = DefaultCategoryErrorValue;
  let categoryImageLink: string | null = null;
  if (editData.subjectFile instanceof File) {
    const filePath = `subject/${editData.subjectFile.name}`;
    const uploadResult = await UploadImage(editData.subjectFile, filePath);

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.categoryImageError = uploadResult;
      setError(error);
      return;
    }
    categoryImageLink = uploadResult;
  }

  let change = false;
  const checkDefault = [
    defaultData.subjectName,
    defaultData.subjectDescription,
  ];
  const checkEdit = [editData.subjectName, editData.subjectDescription];
  for (let i = 0; i < checkDefault.length; i++) {
    if (checkDefault[i] != checkEdit[i]) {
      change = true;
      break;
    }
  }

  //Có sự thay đổi dữ liệu
  if (categoryImageLink != null || change) {
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
          subjectImage: categoryImageLink,
        }),
      },
    );

    if (!response.ok) {
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
  }
  return window.location.reload();
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  if (['categoryImage', 'subjectFile'].includes(data.target.name)) {
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
