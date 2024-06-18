import { NextResponse } from 'next/server';

export default function MessageReturnOnly(
  messageInfo: string,
  statusCode: number,
) {
  return NextResponse.json({ message: messageInfo }, { status: statusCode });
}
