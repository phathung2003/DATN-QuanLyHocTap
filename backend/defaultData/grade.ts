import { IGradeError } from '@/backend/models/messages/IGradeMessage';
import { IGrade } from '@/backend/models/data/IGrade';
const DefaultgradeErrorValue: IGradeError = {
  status: true,
  gradeIDError: null,
  gradeNameError: null,
  systemError: null,
};

export function GradeEditDefaultValue(data: IGrade): IGrade {
  const editData: IGrade = {
    gradeID: data.gradeID,
    gradeName: data.gradeName,
    gradeDescription: data.gradeDescription,
    gradeImage: data.gradeImage,
    gradeFile: undefined,
  };

  return editData;
}

export default DefaultgradeErrorValue;
