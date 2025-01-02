import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from '../../schemas/signUpSchemas';
import axiosInstance from '../../api/axiosInstance';

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
      const response = await axiosInstance.post('/api/check/email/', {
        email,
      });
      console.log(response);
      if (response.status === 200) {
        alert('사용 가능한 이메일입니다.');
        clearErrors('email');
        setIsEmailChecked(true);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 400) {
        setError('email', {
          message: '이미 사용 중인 이메일입니다.',
        });
        setIsEmailChecked(false);
      } else {
        setError('email', {
          message: '닉네임 확인 중 오류가 발생했습니다.',
        });
        setIsEmailChecked(false);
      }
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    try {
      const response = await axiosInstance.post('/api/check/nickname/', {
        nickname,
      });
      console.log(response);
      if (response.status === 200) {
        alert('사용 가능한 닉네임입니다.');
        clearErrors('nickname');
        setIsNicknameChecked(true);
      }
    } catch (error: any) {
      console.log(error);
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
      await axiosInstance.post('/api/signup/', data);
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
              className={`ml-2 px-2 py-1 text-xs rounded ${
                isEmailChecked
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#F28749] text-white hover:bg-orange-600'
              }`}
            >
              중복확인
            </button>
          </div>
          {isEmailChecked && (
            <p className="text-green-500 text-sm mt-1 ml-[25%]">
              중복확인이 완료되었습니다.
            </p>
          )}
          {errors.email && !isEmailChecked && (
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
              {...register('password2', {
                onBlur: () => trigger('password2'),
              })}
              className="w-2/4 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {errors.password2 && (
            <p className="text-red-500 text-sm mt-1 ml-[25%]">
              {errors.password2.message}
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
                className={`ml-2 px-2 py-1 text-xs rounded ${
                  isNicknameChecked
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#F28749] text-white hover:bg-orange-600'
                }`}
              >
                중복확인
              </button>
            </div>
            {isNicknameChecked && (
              <p className="text-green-500 text-sm mt-1 ml-[25%]">
                중복확인이 완료되었습니다.
              </p>
            )}
            {errors.nickname && !isNicknameChecked && (
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
                placeholder="010-1234-5678"
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
                    value="WORKSHOP"
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
                    value="COMPANY"
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
          {role === 'WORKSHOP' && (
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
          {role === 'COMPANY' && (
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
