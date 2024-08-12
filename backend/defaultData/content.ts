import { IContentError } from '@/backend/models/messages/IContentMessage';
import { IContentList } from '@/backend/models/data/Content/IContent';

export function DefaultContentErrorValue(): IContentError {
  return {
    status: true,
    contentNoError: null,
    contentPositionError: null,
    systemError: null,
  };
}

export function DefaultContentValue(): IContentList {
  return {
    contentNo: NaN,
    contentName: '',
    contentDescription: '',
    contentType: 'Default',
    contentData: null,
  };
}

export function ContentEditDefaultValue(data: IContentList): IContentList {
  return {
    contentNo: data.contentNo,
    contentName: data.contentName,
    contentDescription: data.contentDescription,
    contentType: data.contentType,
    contentData: data.contentData,
  };
}
