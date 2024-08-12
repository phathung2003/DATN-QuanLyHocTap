import { createHash } from 'crypto';

//Bỏ dấu tiếng việt
export function RemoveAccent(data: string) {
  try {
    return data
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  } catch {
    return data;
  }
}

//Tạo mã ID
export function GenerateID(input: string | null) {
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
export function GenerateFileName(image: File, path: string, ...data: string[]) {
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
  return `${path}/${fileName}`;
}

//Kiểm tra dữ liệu có chỉnh sửa hay không
export function CheckChangeData(
  defaultData: (string | number | null)[],
  editData: (string | number | null)[],
  imageLink: (string | null)[] | null,
): boolean {
  //Kiểm tra dữ liệu có thay đổi không
  let change = false;
  for (let i = 0; i < defaultData.length; i++) {
    if (defaultData[i] != editData[i]) {
      change = true;
      break;
    }
  }
  if (imageLink) {
    for (const image in imageLink) {
      if (image != null) {
        change = true;
      }
    }
  }
  return change;
}
