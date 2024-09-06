import { AddChatRoom, AddChatMessage } from '../database/chat';
import { GetUserID } from '@/backend/feature/user/validate';
import { HomePage, ChatRoom } from '@/backend/routers';
import { IUserRoom, IUserChatInfo } from '@/backend/models/data/IChat';
import { RemoveAccent } from './general';
import { Timestamp } from 'firebase/firestore';
import { isSameDay, subDays, format, differenceInMinutes } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export async function CreateChatRoom(partnerID: string) {
  const userID = await GetUserID();
  if (!userID) {
    return await HomePage();
  }

  const chatRoomID = await AddChatRoom(userID, partnerID);
  return ChatRoom(chatRoomID);
}

export async function AddMessage(roomID: string, message: string) {
  //Kiểm tra phiên đăng nhập
  const userID = await GetUserID();
  if (!userID) {
    return await HomePage();
  }

  await AddChatMessage(roomID, userID, message);
}

export function SearchCoversation(search: string, taskList: IUserRoom[]) {
  const searchInfo = RemoveAccent(search).toLowerCase();
  return taskList.filter((data) =>
    RemoveAccent(data.name.toLowerCase()).includes(searchInfo),
  );
}

export function SearchUser(search: string, taskList: IUserChatInfo[]) {
  const searchInfo = RemoveAccent(search).toLowerCase();
  return taskList.filter((data) =>
    RemoveAccent(data.name.toLowerCase()).includes(searchInfo),
  );
}

export function FormatChatTime(time: Timestamp): string {
  const serverTime = toZonedTime(Timestamp.now().toDate(), 'Asia/Ho_Chi_Minh');
  const yesterday = subDays(serverTime, 1);
  const targetTime = toZonedTime(time.toDate(), 'Asia/Ho_Chi_Minh');

  //Trong ngày
  if (serverTime.getDate() == targetTime.getDate()) {
    const hours = targetTime.getHours().toString().padStart(2, '0'); // Lấy giờ
    const minutes = targetTime.getMinutes().toString().padStart(2, '0'); // Lấy phút
    return `${hours}:${minutes}`;
  }
  //Ngày hôm qua
  else if (isSameDay(yesterday, targetTime)) {
    return 'Hôm qua';
  } else if (serverTime.getFullYear() === targetTime.getFullYear()) {
    const zonedDate = toZonedTime(targetTime, 'Asia/Ho_Chi_Minh');
    return format(zonedDate, 'dd/MM');
  } else {
    const zonedDate = toZonedTime(targetTime, 'Asia/Ho_Chi_Minh');
    return format(zonedDate, 'dd/MM/yyyy');
  }
}

export function FormatMessageTime(time: Timestamp): string {
  const serverTime = toZonedTime(Timestamp.now().toDate(), 'Asia/Ho_Chi_Minh');
  const targetTime = toZonedTime(time.toDate(), 'Asia/Ho_Chi_Minh');

  //Trong ngày
  if (serverTime.getDate() == targetTime.getDate()) {
    const hours = targetTime.getHours().toString().padStart(2, '0'); // Lấy giờ
    const minutes = targetTime.getMinutes().toString().padStart(2, '0'); // Lấy phút
    return `${hours}:${minutes}`;
  }
  //Ngày hôm qua
  else if (serverTime.getFullYear() === targetTime.getFullYear()) {
    const zonedDate = toZonedTime(targetTime, 'Asia/Ho_Chi_Minh');
    return format(zonedDate, 'dd/MM HH:mm');
  } else {
    const zonedDate = toZonedTime(targetTime, 'Asia/Ho_Chi_Minh');
    return format(zonedDate, 'dd/MM/yyyy HH:mm');
  }
}

export function FormatUserLastLoginTime(time: number | undefined): string {
  if (time == undefined) {
    return '';
  }

  const serverTime = toZonedTime(Timestamp.now().toDate(), 'Asia/Ho_Chi_Minh');
  const targetTime = toZonedTime(time, 'Asia/Ho_Chi_Minh');

  //Trong ngày
  if (serverTime.getDate() == targetTime.getDate()) {
    const hours = targetTime.getHours().toString().padStart(2, '0'); // Lấy giờ
    const minutes = targetTime.getMinutes().toString().padStart(2, '0'); // Lấy phút
    return `Lần cuối đăng nhập: ${hours}:${minutes}`;
  }
  //Ngày hôm qua
  else if (serverTime.getFullYear() === targetTime.getFullYear()) {
    return 'Lần cuối đăng nhập: Hôm qua';
  } else {
    const zonedDate = toZonedTime(targetTime, 'Asia/Ho_Chi_Minh');
    return 'Lần cuối đăng nhập: ' + format(zonedDate, 'dd/MM/yyyy');
  }
}

export function CheckDivider(
  currentTime: Timestamp,
  previousTime: Timestamp,
): boolean {
  const duration = 30; //Sau 30 phút ngăn cách 1 lần
  const current = toZonedTime(currentTime.toDate(), 'Asia/Ho_Chi_Minh');
  const previous = toZonedTime(previousTime.toDate(), 'Asia/Ho_Chi_Minh');
  const difference = Math.abs(differenceInMinutes(current, previous));
  return difference >= duration;
}
