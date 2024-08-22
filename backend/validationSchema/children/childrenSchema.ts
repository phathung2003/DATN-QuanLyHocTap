import * as Yup from 'yup';
import ChildrenMessage from '@/backend/messages/childrenMessage';
import ChildrenCondition from '@/backend/validationSchema/children/childrenCondition';

const SchemaChildRegister = Yup.object().shape({
  //Kiểm tra tên
  name: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(ChildrenCondition.NAME.MIN, ChildrenMessage.NAME.UNDER_MIN_VALUE)
      .max(ChildrenCondition.NAME.MAX, ChildrenMessage.NAME.OVER_MAX_VALUE);
    if (ChildrenCondition.NAME.REQUIRED) {
      baseSchema = baseSchema.required(ChildrenMessage.NAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra tên đăng nhập
  username: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(
        ChildrenCondition.USERNAME.MIN,
        ChildrenMessage.USERNAME.UNDER_MIN_VALUE,
      )
      .max(
        ChildrenCondition.USERNAME.MAX,
        ChildrenMessage.USERNAME.OVER_MAX_VALUE,
      );
    if (ChildrenCondition.USERNAME.REQUIRED) {
      baseSchema = baseSchema.required(ChildrenMessage.USERNAME.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra mật khẩu
  password: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema
      .min(
        ChildrenCondition.PASSWORD.MIN,
        ChildrenMessage.PASSWORD.UNDER_MIN_VALUE,
      )
      .max(
        ChildrenCondition.PASSWORD.MAX,
        ChildrenMessage.PASSWORD.OVER_MAX_VALUE,
      );

    if (ChildrenCondition.PASSWORD.REQUIRED) {
      baseSchema = baseSchema.required(ChildrenMessage.PASSWORD.REQUIRED);
    }
    return baseSchema;
  }),

  //Kiểm tra nhâp lại mật khẩu
  rePassword: Yup.string().when([], (isRequired, schema) => {
    let baseSchema = schema;
    if (ChildrenCondition.RE_PASSWORD.REQUIRED) {
      baseSchema = baseSchema
        .oneOf(
          [Yup.ref('password'), undefined],
          ChildrenMessage.RE_PASSWORD.NO_MATCH,
        )
        .nullable()
        .required(ChildrenMessage.RE_PASSWORD.REQUIRED);
    }
    return baseSchema;
  }),
});

export default SchemaChildRegister;
