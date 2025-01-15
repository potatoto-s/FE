import * as yup from 'yup';

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email('유효한 이메일 형식이 아닙니다.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '유효한 이메일 형식이 아닙니다.'
    )
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
  password2: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
  nickname: yup
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(10, '닉네임은 최대 10자 이하로 입력해주세요.')
    .required('닉네임을 입력해주세요.'),
  phone: yup
    .string()
    .matches(
      /^(\d{3}-\d{3,4}-\d{4})$/,
      '전화번호는 "010-1234-5678" 형식으로 입력해주세요.'
    )
    .required('전화번호를 입력해주세요.'),
  role: yup.string().required('회원 구분을 선택해주세요.'),
  workshop_name: yup.string().when('role', {
    is: 'WORKSHOP',
    then: (schema) => schema.required('공방 이름을 입력해주세요.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  company_name: yup.string().when('role', {
    is: 'COMPANY',
    then: (schema) => schema.required('기업 이름을 입력해주세요.'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
