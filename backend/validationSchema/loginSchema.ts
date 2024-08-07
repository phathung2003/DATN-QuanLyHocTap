import * as Yup from 'yup';
import LoginMessage from '@/backend/messages/loginMessage';

const SchemaLogin = Yup.object().shape({
  info: Yup.string().required(LoginMessage.NO_INFO),
  password: Yup.string().required(LoginMessage.NO_PASSWORD),
});

export default SchemaLogin;
