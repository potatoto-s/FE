import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from '@schemas/signUpSchemas';
import axiosInstance from '@api/axiosInstance';
import SignUpInput from '@pages/signup/SignUpInput';

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
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const navigate = useNavigate();
  const role = watch('role');
  const email = watch('email');
  const nickname = watch('nickname');

  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  useEffect(() => {
    setIsNicknameChecked(false);
  }, [nickname]);

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const response = await axiosInstance.post('/api/users/check/email/', {
        email,
      });
      if (response.status === 200) {
        alert('사용 가능한 이메일입니다.');
        clearErrors('email');
        setIsEmailChecked(true);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('email', {
          message: '이미 사용 중인 이메일입니다.',
        });
        setIsEmailChecked(false);
      } else {
        setError('email', {
          message: '이메일 확인 중 오류가 발생했습니다.',
        });
        setIsEmailChecked(false);
      }
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    try {
      const response = await axiosInstance.post('/api/users/check/nickname/', {
        nickname,
      });
      if (response.status === 200) {
        alert('사용 가능한 닉네임입니다.');
        clearErrors('nickname');
        setIsNicknameChecked(true);
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError('nickname', {
          message: '이미 사용 중인 닉네임입니다.',
        });
        setIsNicknameChecked(false);
      } else {
        setError('nickname', {
          message: '닉네임 확인 중 오류가 발생했습니다.',
        });
        setIsNicknameChecked(false);
      }
    }
  };

  // 폼 제출 처리
  const onSubmit = async (data: any) => {
    try {
      await axiosInstance.post('/api/users/signup/', data);
      alert('회원가입이 완료되었습니다.');
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
          <SignUpInput
            label="이메일*"
            inputType="email"
            attribute={register('email', {
              onBlur: () => trigger('email'),
            })}
            message={
              isEmailChecked
                ? '중복 확인이 완료되었습니다.'
                : errors.email
                  ? errors.email.message
                  : ''
            }
            messageColor={isEmailChecked ? 'green' : 'red'}
          >
            <button
              type="button"
              onClick={handleCheckEmail}
              disabled={isEmailChecked}
              className={`ml-2 px-2 py-1 text-xs rounded ${
                isEmailChecked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F28749] text-white hover:bg-orange-600'
              }`}
            >
              중복확인
            </button>
          </SignUpInput>

          {/* 비밀번호 */}
          <SignUpInput
            label="비밀번호*"
            inputType="password"
            attribute={register('password', {
              onBlur: () => trigger('password'),
            })}
            message={errors.password ? errors.password.message : ''}
          />

          {/* 비밀번호 확인 */}
          <SignUpInput
            label="비밀번호 확인*"
            inputType="password"
            attribute={register('password2', {
              onBlur: () => trigger('password2'),
            })}
            message={errors.password2 ? errors.password2.message : ''}
          />

          {/* 이름 */}
          <SignUpInput
            label="이름*"
            inputType="text"
            attribute={register('name', {
              onBlur: () => trigger('name'),
            })}
            message={errors.name ? errors.name.message : ''}
          />

          {/* 닉네임 */}
          <SignUpInput
            label="닉네임*"
            inputType="text"
            attribute={register('nickname', {
              onBlur: () => trigger('nickname'),
            })}
            message={
              isNicknameChecked
                ? '중복 확인이 완료되었습니다.'
                : errors.nickname
                  ? errors.nickname.message
                  : ''
            }
            messageColor={isNicknameChecked ? 'green' : 'red'}
          >
            <button
              type="button"
              onClick={handleCheckNickname}
              disabled={isNicknameChecked}
              className={`ml-2 px-2 py-1 text-xs rounded ${
                isNicknameChecked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F28749] text-white hover:bg-orange-600'
              }`}
            >
              중복확인
            </button>
          </SignUpInput>

          {/* 전화번호 */}
          <SignUpInput
            label="전화번호*"
            inputType="tel"
            attribute={register('phone', {
              onBlur: () => trigger('phone'),
            })}
            message={errors.phone ? errors.phone.message : ''}
            placeholder="010-1234-5678"
          />

          {/* 회원구분 */}
          <SignUpInput
            label="회원구분*"
            inputType="radio"
            message={errors.role?.message}
            messageColor="red"
          >
            <label className="flex items-center">
              <input
                type="radio"
                {...register('role', { onBlur: () => trigger('role') })}
                value="WORKSHOP"
                className="mr-2"
              />
              공방
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...register('role', { onBlur: () => trigger('role') })}
                value="COMPANY"
                className="mr-2"
              />
              기업
            </label>
          </SignUpInput>

          {/* 공방 이름 */}
          {role === 'WORKSHOP' && (
            <SignUpInput
              label="공방 이름*"
              inputType="text"
              attribute={register('workshop_name', {
                onBlur: () => trigger('workshop_name'),
              })}
              message={errors.workshop_name?.message}
              messageColor="red"
            />
          )}

          {/* 기업 이름 */}
          {role === 'COMPANY' && (
            <SignUpInput
              label="기업 이름*"
              inputType="text"
              attribute={register('company_name', {
                onBlur: () => trigger('company_name'),
              })}
              message={errors.company_name?.message}
              messageColor="red"
            />
          )}

          {/* 제출 버튼 */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              type="submit"
              disabled={!isValid || !isEmailChecked || !isNicknameChecked}
              className={`px-4 py-2 rounded ${
                isValid && isEmailChecked && isNicknameChecked
                  ? 'bg-[#F28749] text-white hover:bg-orange-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
