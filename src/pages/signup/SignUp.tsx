import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 유효성 검사 스키마
const schema = yup.object({
  email: yup
    .string()
    .email('유효한 이메일 형식이 아닙니다.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
  confirm_password: yup
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
    .matches(/^\d{10,11}$/, '전화번호는 10~11자리의 숫자만 입력 가능합니다.')
    .required('전화번호를 입력해주세요.'),
  role: yup.string().required('회원 구분을 선택해주세요.'),
  workshop_name: yup.string().when('role', {
    is: 'workshop',
    then: (schema) => schema.required('공방 이름을 입력해주세요.'),
    otherwise: (schema) => schema.notRequired(),
  }),
  company_name: yup.string().when('role', {
    is: 'company',
    then: (schema) => schema.required('기업 이름을 입력해주세요.'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const navigate = useNavigate();
  const role = watch('role');

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const email = watch('email');
      const response = await axios.post('/api/users/email-check/', { email });
      if (response.data.available) {
        alert('사용 가능한 이메일입니다.');
        clearErrors('email');
        setIsEmailChecked(true);
        setError('email', { message: '이미 사용 중인 이메일입니다.' });
        setIsEmailChecked(false);
      }
    } catch {
      setError('email', { message: '이메일 확인 중 오류가 발생했습니다.' });
      setIsEmailChecked(false);
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    try {
      const nickname = watch('nickname');
      const response = await axios.post('/api/users/nickname-check/', {
        nickname,
      });
      if (response.data.available) {
        alert('사용 가능한 닉네임입니다.');
        clearErrors('nickname');
        setIsNicknameChecked(true);
      } else {
        setError('nickname', { message: '이미 사용 중인 닉네임입니다.' });
        setIsNicknameChecked(false);
      }
    } catch {
      setError('nickname', {
        message: '닉네임 확인 중 오류가 발생했습니다.',
      });
      setIsNicknameChecked(false);
    }
  };

  // 폼 제출 처리
  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('/api/users/signup/', data);
      alert(response.data.message);
      navigate('/login');
    } catch {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="w-full max-w-[81.25rem] flex flex-col items-center pb-16">
        <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
        <h1 className="text-2xl font-bold text-[#F28749]">회원가입</h1>
        <div className="w-full h-[1px] bg-gray-300 mt-4"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[37.5rem] p-8 rounded space-y-4"
        >
          {/* 이메일 */}
          <div className="flex items-center">
            <label className="w-1/4 text-gray-700 pr-2">이메일*</label>
            <input
              type="email"
              {...register('email', {
                onBlur: () => trigger('email'),
              })}
              className="w-2/4 border border-gray-300 rounded px-3 py-2"
            />
            <button
              type="button"
              onClick={handleCheckEmail}
              disabled={isEmailChecked}
              className={`ml-2 px-3 py-1 text-sm rounded ${
                isEmailChecked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F28749] text-white hover:bg-orange-600'
              }`}
            >
              중복확인
            </button>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ml-[25%]">
              {errors.email.message}
            </p>
          )}

          {/* 비밀번호 */}
          <div className="flex items-center">
            <label className="w-1/4 text-gray-700 pr-2">비밀번호*</label>
            <input
              type="password"
              {...register('password', {
                onBlur: () => trigger('password'),
              })}
              className="w-2/4 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 ml-[25%]">
              {errors.password.message}
            </p>
          )}

          {/* 비밀번호 확인 */}
          <div className="flex items-center">
            <label className="w-1/4 text-gray-700 pr-2">비밀번호 확인*</label>
            <input
              type="password"
              {...register('confirm_password', {
                onBlur: () => trigger('confirm_password'),
              })}
              className="w-2/4 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-sm mt-1 ml-[25%]">
              {errors.confirm_password.message}
            </p>
          )}

          {/* 이름 */}
          <div className="flex items-center">
            <label className="w-1/4 text-gray-700 pr-2">이름*</label>
            <input
              type="text"
              {...register('name', {
                onBlur: () => trigger('name'),
              })}
              className="w-2/4 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 ml-[25%]">
              {errors.name.message}
            </p>
          )}

          {/* 닉네임 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">닉네임*</label>
              <input
                type="text"
                {...register('nickname', {
                  onBlur: () => trigger('nickname'),
                })}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                disabled={isNicknameChecked}
                className={`ml-2 px-3 py-1 text-sm rounded ${
                  isNicknameChecked
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#F28749] text-white hover:bg-orange-600'
                }`}
              >
                중복확인
              </button>
            </div>
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.nickname.message}
              </p>
            )}
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">전화번호*</label>
              <input
                type="tel"
                {...register('phone', {
                  onBlur: () => trigger('phone'),
                })}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* 회원구분 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">회원구분*</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role', {
                      onBlur: () => trigger('role'),
                    })}
                    value="workshop"
                    className="mr-2"
                  />
                  공방
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    {...register('role', {
                      onBlur: () => trigger('role'),
                    })}
                    value="company"
                    className="mr-2"
                  />
                  기업
                </label>
              </div>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* 공방 이름 */}
          {role === 'workshop' && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <label className="w-1/4 text-gray-700 pr-2">공방 이름*</label>
                <input
                  type="text"
                  {...register('workshop_name', {
                    onBlur: () => trigger('workshop_name'),
                  })}
                  className="w-2/4 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              {errors.workshop_name && (
                <p className="text-red-500 text-sm mt-1 ml-[25%]">
                  {errors.workshop_name.message}
                </p>
              )}
            </div>
          )}

          {/* 기업 이름 */}
          {role === 'company' && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <label className="w-1/4 text-gray-700 pr-2">기업 이름*</label>
                <input
                  type="text"
                  {...register('company_name', {
                    onBlur: () => trigger('company_name'),
                  })}
                  className="w-2/4 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              {errors.company_name && (
                <p className="text-red-500 text-sm mt-1 ml-[25%]">
                  {errors.company_name.message}
                </p>
              )}
            </div>
          )}

          {/* 제출 버튼 */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 rounded ${
                isValid
                  ? 'bg-[#F28749] text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
