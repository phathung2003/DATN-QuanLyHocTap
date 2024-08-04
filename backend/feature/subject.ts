import { ISubject } from '@/backend/models/data/ISubject';
import { ISubjectError } from '@/backend/models/messages/ISubjectMessage';
import { GetToken } from '@/backend/feature/validate';
import { HomePage } from '@/backend/routers';
import { DefaultSubjectErrorValue } from '@/backend/defaultData/subject';
import { UploadImage, DeleteImage } from '@/backend/database/generalFeature';
import { GenerateID, GenerateFileName } from '@/backend/feature/general';
import GlobalMessage from '@/backend/messages/gobalMessage';
import SubjectMessage from '@/backend/messages/subjectMessage';
import { RemoveAccent } from '@/backend/feature/general';

//Lấy môn học
export async function GetSubject() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/subject/list`,
    { method: 'GET', cache: 'no-store' },
  );
  const info: ISubject[] = await response.json();
  if (Array.isArray(info)) {
    return info;
  }
  return [];
}

//Thêm môn học
export async function AddSubject(
  data: ISubject,
  setError: React.Dispatch<React.SetStateAction<ISubjectError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Đăng tải hình
  const error = DefaultSubjectErrorValue;
  if (data.subjectFile instanceof File) {
    const uploadResult = await UploadImage(
      data.subjectFile,
      GenerateFileName(data.subjectFile, data.subjectName, token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.subjectFileError = uploadResult;
      setError(error);
      return;
    }
    data.subjectImage = uploadResult;
  }

  //Thêm dữ liệu vào cơ sở dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/subject/add`,
    {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        subjectID: GenerateID(data.subjectName),
        subjectName: data.subjectName,
        subjectDescription: data.subjectDescription,
        subjectImage: !data.subjectImage ? null : data.subjectImage,
      }),
    },
  );

  if (response.ok) {
    return window.location.reload();
  } else {
    const errorData = await response.json();

    error.status = false;
    if (errorData.message == SubjectMessage.SUBJECT_EXIST) {
      error.subjectNameError = errorData.message;
    } else {
      error.systemError = errorData.message;
    }
    setError(error);
    DeleteImage(data.subjectImage);
  }
}

//Chỉnh sửa môn học
export async function EditSubject(
  editData: ISubject,
  defaultData: ISubject,
  setError: React.Dispatch<React.SetStateAction<ISubjectError>>,
) {
  //Kiểm tra lấy token
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tải hình
  const error = DefaultSubjectErrorValue;
  let subjectImageLink: string | null = null;
  if (editData.subjectFile instanceof File) {
    const uploadResult = await UploadImage(
      editData.subjectFile,
      GenerateFileName(editData.subjectFile, 'subject', token),
    );

    if (uploadResult === GlobalMessage.UPLOAD_IMAGE_ERROR) {
      error.status = false;
      error.subjectFileError = uploadResult;
      setError(error);
      return;
    }
    subjectImageLink = uploadResult;
  }

  //Kiểm tra có sự thay đổi dữ liệu hay không
  const checkDefault = [
    defaultData.subjectName,
    defaultData.subjectDescription,
  ];
  const checkEdit = [editData.subjectName, editData.subjectDescription];

  if (!ChangeData(checkDefault, checkEdit, subjectImageLink)) {
    DeleteImage(subjectImageLink);
    return window.location.reload();
  }

  //Tiến hành cập nhật dữ liệu
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/subject/edit?subjectID=${defaultData.subjectID}`,
    {
      method: 'PUT',
      cache: 'no-store',
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

  if (errorData.message == SubjectMessage.SUBJECT_EXIST) {
    error.subjectNameError = errorData.message;
  } else {
    error.systemError = errorData.message;
  }
  setError(error);
  return;
}

//Xóa môn học
export async function DeleteSubject(
  subjectID: string,
  setError: React.Dispatch<React.SetStateAction<ISubjectError>>,
) {
  //Kiểm tra phiên đăng nhập
  const token = await GetToken();
  if (typeof token === 'object') {
    return await HomePage();
  }

  //Tiến hành xóa loại
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/subject/delete?subjectID=${subjectID}`,
    {
      method: 'DELETE',
      cache: 'no-store',
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
  const error = DefaultSubjectErrorValue;
  const errorData = await response.json();
  error.status = false;
  error.systemError = errorData.message;
  setError(error);
  return;
}

//Tìm kiếm
export function SearchSubject(search: string, subjectList: ISubject[]) {
  const searchInfo = RemoveAccent(search).toLowerCase();
  return subjectList.filter(
    (data) =>
      RemoveAccent(data.subjectID.toLowerCase()).includes(searchInfo) ||
      RemoveAccent(data.subjectName.toLowerCase()).includes(searchInfo),
  );
}

//Reset lỗi
export function ResetError(
  data,
  setFieldValue,
  setError: React.Dispatch<React.SetStateAction<ISubjectError>>,
  setPreview: React.Dispatch<React.SetStateAction<string | null>>,
) {
  //Nếu là hình ==> Đặt hình xem trước
  if (['subjectImage', 'subjectFile'].includes(data.target.name)) {
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
      [
        'subjectName',
        'subjectDescription',
        'subjectImage',
        'subjectFile',
      ].includes(data.target.name)
    ) {
      newErrorState[`${data.target.name}Error`] = null;
    }

    return newErrorState;
  });
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
