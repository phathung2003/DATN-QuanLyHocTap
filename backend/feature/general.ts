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
export function GenerateFileName(image: File, type: string, ...data: string[]) {
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
