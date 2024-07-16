import { NextResponse } from 'next/server';
import { AddCollection } from '@/backend/database/collection';
import { CheckDataInputNeedLogin, GetUserID } from '@/app/api/checkData';
import CollectionMessage from '@/backend/messages/collectionMessage';
import MessageReturnOnly from '@/app/api/messageReturnOnly';
import APIMessage from '@/backend/messages/apiMessage';
import CollectionData from '@/app/api/collection/collectionData';
import { CheckInfoExist } from '@/backend/database/generalFeature';
import { Status, TableName } from '@/backend/globalVariable';
import { DefaultCollectionErrorValue } from '@/backend/defaultData/collection';
import ICollection from '@/backend/models/data/ICollection';

export async function POST(request: Request) {
  try {
    //Kiểm tra dữ liệu hợp lệ
    const dataInput = await CheckData(request);
    if (dataInput === false) {
      return MessageReturnOnly(APIMessage.WRONG_INPUT, 400);
    }

    //Kiểm tra phiên đăng nhập hợp lệ
    const userID = await GetUserID(dataInput.token);
    if (typeof userID != 'string') {
      return userID;
    }

    //Kiểm tra xem lớp với môn học có tồn tại trên hệ thống hay chưa
    const collectionData = await CheckClassification(dataInput.data, userID);
    if (collectionData instanceof NextResponse) {
      return collectionData;
    }

    //Thêm dữ liệu vào bảng
    await AddCollection(collectionData);
    return MessageReturnOnly(CollectionMessage.COLLECTION_ADD_COMPLETE, 201);
  } catch {
    return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
  }
}

//Kiểm tra dữ liệu
async function CheckData(request: Request) {
  try {
    //Các trường có thể null
    const nullableCheckField = ['collectionDescription', 'collectionImage'];
    const checkField = [
      'collectionGrade',
      'collectionSubject',
      'collectionName',
    ];
    const result = await CheckDataInputNeedLogin(
      request,
      checkField,
      nullableCheckField,
    );
    if (!result) {
      return false;
    }

    const gradeData = CollectionData(result.data);
    if (!gradeData) {
      return false;
    }
    return { token: result.token, data: gradeData };
  } catch {
    return false;
  }
}

//Kiểm tra loại có trên hệ thống hay không
async function CheckClassification(dataInput: ICollection, authorID: string) {
  const error = DefaultCollectionErrorValue;
  const collectionData = dataInput;
  collectionData.collectionAuthorID = authorID;

  const filed = [
    ['gradeID', 'gradeName'],
    ['subjectID', 'subjectName'],
  ];

  const data = [dataInput.collectionGrade, dataInput.collectionSubject];
  const table = [TableName.GRADE, TableName.SUBJECT];

  //Kiểm tra thông tin
  for (let i = 0; i < table.length; i++) {
    const result = await CheckInfoExist(data[i], table[i], filed[i]);
    if (result == Status.SYSTEM_ERROR) {
      return MessageReturnOnly(APIMessage.SYSTEM_ERROR, 500);
    }
    if (result == Status.NOT_FOUND) {
      error.status = false;
      switch (table[i]) {
        case TableName.GRADE:
          error.collectionGradeError =
            CollectionMessage.COLLECTION_GRADE.NOT_EXIST;
          break;
        case TableName.SUBJECT:
          error.collectionSubjectError =
            CollectionMessage.COLLECTION_SUBJECT.NOT_EXIST;
          break;
      }
    } else {
      switch (table[i]) {
        case TableName.GRADE:
          collectionData.collectionGrade = result;
          break;
        case TableName.SUBJECT:
          collectionData.collectionSubject = result;
          break;
      }
    }
  }

  //Có lỗi xảy ra
  if (!error.status) {
    return new NextResponse(
      JSON.stringify({
        message: CollectionMessage.COLLECTION_ADD_FAILED,
        errorMessage: error,
      }),
      {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
  return collectionData;
}
