/*eslint-disable*/
import {
  doc,
  updateDoc,
  addDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/backend/database/firebase';
import { TableName } from '@/backend/globalVariable';
import { IUserRoom, IMessage } from '../models/data/IChat';
import { GetInfo } from './users';

//Tạo phòng chat
export async function AddChatRoom(
  firstUserID: string,
  secondUserID: string,
): Promise<string> {
  const chatCollection = collection(db, TableName.CHAT);
  const serverTime = Timestamp.now();

  //Kiểm tra đã tồn tại phòng chat chưa
  const chatQuery = query(
    chatCollection,
    where('userID', '==', [firstUserID, secondUserID]),
  );
  const documents = await getDocs(chatQuery);

  //Chưa tồn tại => Tạo phòng chat mới
  if (documents.size == 0) {
    const document = await addDoc(chatCollection, {
      userID: [firstUserID, secondUserID],
      lastMessage: null,
      lastUpdate: serverTime,
    });
    return document.id;
  }
  return documents.docs[0].id;
}

//Lấy danh sách phòng chat hiện có của người dùng
export function GetUserChatRoom(
  userID: string,
  callback: (chatRooms: IUserRoom[]) => void,
): () => void {
  const chatCollection = collection(db, TableName.CHAT);

  const chatQuery = query(
    chatCollection,
    where('userID', 'array-contains-any', [userID]),
  );

  // Lắng nghe các thay đổi theo thời gian thực
  const unsubscribe = onSnapshot(chatQuery, async (snapshot) => {
    if (snapshot.size > 0) {
      const chatList = await Promise.all(
        snapshot.docs.map((doc) => ChatRoomData(doc, userID)),
      );
      callback(chatList);
    } else {
      callback([]); // Nếu không có phòng chat nào, trả về mảng rỗng
    }
  });

  // Trả về hàm để ngắt kết nối listener khi không cần thiết
  return unsubscribe;
}

//Lấy tên người nhận
export async function GetOpponentName(
  roomID: string,
  userID: string,
): Promise<string> {
  const document = doc(db, TableName.CHAT, roomID);
  const documentData = await getDoc(document);
  if (documentData.exists()) {
    const filterID = documentData.data().userID.filter((id) => id !== userID);
    let userInfo;
    if (filterID.length == 0) {
      userInfo = await GetInfo(userID);
    } else {
      userInfo = await GetInfo(filterID[0]);
    }
    return !userInfo ? 'Người dùng' : userInfo.name;
  }
  return 'Người dùng';
}

//Lưu tin nhắn
export async function AddChatMessage(
  roomID: string,
  userID: string,
  message: string,
) {
  //Lưu tin nhắn
  const baseURL = `${TableName.CHAT}/${roomID}/${TableName.MESSAGE}`;
  const chatCollection = collection(db, baseURL);
  const serverTime = Timestamp.now();
  await addDoc(chatCollection, {
    userID: userID,
    message: message,
    uploadTime: serverTime,
  });

  //Tạo bản sao thông tin lần cuối lên phòng chat
  const document = doc(db, TableName.CHAT, roomID);
  await updateDoc(document, {
    lastMessage: message,
    lastUpdate: serverTime,
  });
}

//Lấy danh sách tin nhắn
//Lấy danh sách phòng chat hiện có của người dùng
export function GetMessage(
  userID: string,
  roomID: string,
  callback: (chatRooms: IMessage[]) => void,
): () => void {
  const baseURL = `${TableName.CHAT}/${roomID}/${TableName.MESSAGE}`;
  const chatCollection = collection(db, baseURL);

  // Lắng nghe các thay đổi theo thời gian thực
  const unsubscribe = onSnapshot(chatCollection, async (snapshot) => {
    if (snapshot.size > 0) {
      const messageList = await Promise.all(
        snapshot.docs.map((doc) => MessageData(doc, userID)),
      );
      callback(messageList);
    } else {
      callback([]); // Nếu không có phòng chat nào, trả về mảng rỗng
    }
  });

  // Trả về hàm để ngắt kết nối listener khi không cần thiết
  return unsubscribe;
}

//Nội bộ
async function ChatRoomData(doc, userID: string): Promise<IUserRoom> {
  const filterID = doc.data().userID.filter((id) => id !== userID);
  let userInfo;
  if (filterID.length == 0) {
    userInfo = await GetInfo(userID);
  } else {
    userInfo = await GetInfo(filterID[0]);
  }

  return {
    chatRoomID: doc.id,
    userID: filterID[0],
    name: !userInfo ? 'Người dùng' : userInfo.name,
    lastMessage: doc.data().lastMessage,
    lastUpdate: doc.data().lastUpdate ?? Timestamp.now(),
  };
}

async function MessageData(doc, userID: string): Promise<IMessage> {
  return {
    message: doc.data().message,
    uploadTime: doc.data().uploadTime,
    isOwnMessage: doc.data().userID == userID ? true : false,
  };
}
