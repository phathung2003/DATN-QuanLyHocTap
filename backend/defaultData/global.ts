import { IAPIResult } from '@/backend/models/data/IGlobal';

export function DefaultAPIResult(): IAPIResult {
  return {
    status: true,
    message: null,
  };
}
