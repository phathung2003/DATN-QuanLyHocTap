import ICategory from '@/backend/models/data/ICategory';
import { ICategoryError } from '@/backend/models/messages/ICategoryMessage';
import { DefaultCategoryErrorValue } from '../defaultData/category';
import { storage } from '@/backend/database/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function handelSubmit(
  data: ICategory,
  setError: React.Dispatch<React.SetStateAction<ICategoryError>>,
) {
  console.log(data);
  if (data.categoryImage != null) {
    const storageRef = ref(storage, `images/${data.categoryImage.name}`);
    console.log(data.categoryImage);
    await uploadBytes(storageRef, data.categoryImage);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
  }
  const error = DefaultCategoryErrorValue;
  setError(error);
}

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
    if (['username', 'phoneNumber', 'email'].includes(data.target.name)) {
      newErrorState[`${data.target.name}Error`] = null;
    }
    return newErrorState;
  });
}
