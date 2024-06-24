import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { ICategory } from '@/backend/models/data/ICategory';
import CategoryMessage from '@/backend/messages/categoryMessage';
import DefaultCategoryErrorValue from '@/backend//defaultData/category';
import { db } from '@/backend/database/firebase';

const tableName = 'category';

//Thêm loại
export async function AddCategory(data: ICategory) {
  try {
    const categoryInfo = doc(db, tableName, data.categoryID);
    await setDoc(categoryInfo, {
      categoryID: data.categoryID,
      categoryName: data.categoryName,
    });

    return true;
  } catch {
    return false;
  }
}

//Xóa loại
export async function DeleteCategory(categoryID: string) {
  const categoryDatabase = collection(db, tableName);
  const categoryData = query(
    categoryDatabase,
    where('categoryID', '==', categoryID),
  );
  const categoryResult = await getDocs(categoryData);

  categoryResult.forEach(async (category) => {
    await deleteDoc(category.ref);
  });
}

//Lấy danh sách loại
export async function GetCategoryList() {
  try {
    const categorieDatabase = collection(db, tableName);
    const categoryData = await getDocs(categorieDatabase);
    const categoryList = await categoryData.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().categoryName,
    }));
    return categoryList;
  } catch {
    return CategoryMessage.SYSTEM_ERROR;
  }
}

//Kiểm tra đã có loại chưa
export async function CheckCategoryExist(data: ICategory) {
  const error = DefaultCategoryErrorValue;

  try {
    const categoryDatabase = collection(db, tableName);
    const field = ['categoryID', 'categoryName'];
    const input = [data.categoryID, data.categoryName];

    for (let i = 0; i < field.length; i++) {
      if (input[i] != null) {
        const userData = query(
          categoryDatabase,
          where(field[i], '==', input[i]),
        );
        const result = await getDocs(userData);
        if (result.empty == false) {
          error.status = false;
          switch (field[i]) {
            case field[0]:
              error.categoryIDError = CategoryMessage.CATEGORY_ID_EXIST;
              break;
            case field[1]:
              error.categoryNameError = CategoryMessage.CATEGORY_NAME_EXIST;
              break;
          }
        }
      }
    }
  } catch (error) {
    error.status = false;
    error.systemError = CategoryMessage.SYSTEM_ERROR;
  }
  return error;
}
