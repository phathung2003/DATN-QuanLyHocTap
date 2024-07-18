import { ICourseError } from '@/backend/models/messages/ICourseMessage';
// import { createHash } from 'crypto';
import { DefaultCourseErrorValue } from '@/backend/defaultData/course';
import ICourse from '@/backend/models/data/ICourse';

//Thêm loại
export async function handelSubmit(
  data: ICourse,
  setError: React.Dispatch<React.SetStateAction<ICourseError>>,
) {
  console.log(data);
  setError(DefaultCourseErrorValue);
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
