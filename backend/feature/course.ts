import { ICourseError } from '@/backend/models/messages/ICourseMessage';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import { DefaultCourseErrorValue } from '@/backend/defaultData/course';
import ICourse from '@/backend/models/data/ICourse';
import { createHash } from 'crypto';

import GlobalMessage from '@/backend/messages/gobalMessage';

//Lấy thông tin 1 khóa học
export async function GetCourseInfo(courseID: string): Promise<ICourse | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/course/list?courseID=${courseID}`,
    { method: 'GET' },
  );
  const info = await response.json();
  if (info) {
    return info;
  }
  return null;
}

//Thêm khóa học
export async function AddCourse(
  data: ICourse,
  setError: React.Dispatch<React.SetStateAction<ICourseError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Đăng tải hình
  const error = DefaultCourseErrorValue;
  if (data.courseFile instanceof File) {
    const uploadResult = await UploadImage(
      data.courseFile,
      GenerateFileName(data.courseFile, data.courseName, token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.courseFileError = uploadResult;
      setError(error);
      return;
    }
    data.courseImage = uploadResult;
  }

  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/course/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        courseGrade: data.courseGrade,
        courseSubject: data.courseSubject,
        courseName: data.courseName,
        courseDescription: data.courseDescription,
        courseImage: !data.courseImage ? null : data.courseImage,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  } else {
    const errorData = await response.json();

    error.status = false;
    error.systemError = errorData.message;
    setError(error);
    DeleteImage(data.courseImage);
  }
}

//Chỉnh sửa khóa học
export async function EditCourse(
  editData: ICourse,
  defaultData: ICourse,
  setError: React.Dispatch<React.SetStateAction<ICourseError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tải hình
  const error = DefaultCourseErrorValue;
  if (editData.courseFile instanceof File) {
    const uploadResult = await UploadImage(
      editData.courseFile,
      GenerateFileName(editData.courseFile, 'course', token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.courseFileError = uploadResult;
      setError(error);
      return;
    }

    editData.courseImage = !uploadResult ? null : uploadResult;
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [defaultData.courseName, defaultData.courseDescription];
  const checkEdit = [editData.courseName, editData.courseDescription];

  if (!ChangeData(checkDefault, checkEdit, editData.courseImage)) {
    DeleteImage(editData.courseImage);
    return window.location.reload();
  }

  //Tiến hành cập nhật dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/course/edit?courseID=${defaultData.courseID}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        courseGrade: editData.courseGrade,
        courseSubject: editData.courseSubject,
        courseName: editData.courseName,
        courseDescription: editData.courseDescription,
        courseImage: editData.courseImage,
      }),
    },
  );

  if (response.ok) {
    DeleteImage(defaultData.courseImage);
    return window.location.reload();
  }
  const errorData = await response.json();
  error.status = false;
  console.log(errorData.message);
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Xóa loại
export async function DeleteCourse(
  courseID: string,
  setError: React.Dispatch<React.SetStateAction<ICourseError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tiến hành xóa loại
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/content/course/delete?courseID=${courseID}`,
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
  const error = DefaultCourseErrorValue;
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//----------- Nội bộ -----------//
//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ICourseError>>,
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

// //Tạo mã ID
// function GenerateID(input: string | null) {
//   // Normalize the string to remove accents
//   if (input != null) {
//     const normalized = input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//     // Replace spaces with dashes and make lowercase
//     const ID = normalized.replace(/\s+/g, '-').toLowerCase();
//     return ID;
//   }
//   return null;
// }

// //Tạo tên hình
// function GenerateFileName(image: File, type: string, ...data: string[]) {
//   let streamFile = '';

//   //Đọc file hình
//   const reader = new FileReader();
//   reader.readAsDataURL(image);
//   reader.onloadend = () => {
//     if (typeof reader.result === 'string') {
//       streamFile = reader.result;
//     }
//   };
//   const combinedData = data.join('') + streamFile + new Date();

//   const fileName = createHash('sha256').update(combinedData).digest('hex');
//   return `${type.toLowerCase()}/${fileName}`;
// }

// //Kiểm tra dữ liệu có chỉnh sửa hay không
// function ChangeData(
//   defaultData: (string | null)[],
//   editData: (string | null)[],
//   imageLink: string | null,
// ): boolean {
//   //Kiểm tra dữ liệu có thay đổi không
//   let change = false;
//   for (let i = 0; i < defaultData.length; i++) {
//     if (defaultData[i] != editData[i]) {
//       change = true;
//       break;
//     }
//   }
//   return imageLink != null || change;
// }

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
