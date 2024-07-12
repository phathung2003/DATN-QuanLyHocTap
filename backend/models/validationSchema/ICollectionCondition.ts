export default interface ICollectionMessage {
  COLLECTION_NAME: {
    MAX: number;
    REQUIRED: boolean;
  };

  COLLECTION_GRADE: {
    REQUIRED: boolean;
  };

  COLLECTION_SUBJECT: {
    REQUIRED: boolean;
  };

  COLLECTION_DESCRIPTION: {
    MAX: number;
    REQUIRED: boolean;
  };

  COLLECTION_IMAGE: {
    REQUIRED: boolean;
  };
}
