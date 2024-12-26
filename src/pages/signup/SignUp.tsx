import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Errors {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  nickname: string;
  phone: string;
  company_name: string;
  workshop_name: string;
  role: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    name: '',
    nickname: '',
    phone: '',
    role: '',
    company_name: '',
    workshop_name: '',
  });
  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
    confirm_password: '',
    name: '',
    nickname: '',
    phone: '',
    company_name: '',
    workshop_name: '',
    role: '',
  });
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // 유효성 검사 함수
  const validate = useCallback((): boolean => {
    const newErrors: Errors = {
      email: '',
      password: '',
      confirm_password: '',
      name: '',
      nickname: '',
      phone: '',
      company_name: '',
      workshop_name: '',
      role: '',
    };

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다.';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = '비밀번호가 일치하지 않습니다.';
    }

    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.nickname) {
      newErrors.nickname = '닉네임을 입력해주세요.';
    } else if (formData.nickname.length < 2 || formData.nickname.length > 10) {
      newErrors.nickname = '닉네임은 2자 이상, 10자 이하로 입력해주세요.';
    }

    if (formData.phone && !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = '전화번호는 10~11자리의 숫자만 입력 가능합니다.';
    }

    if (!formData.role) {
      newErrors.role = '회원 구분을 선택해주세요.';
    } else if (formData.role === 'workshop' && !formData.workshop_name) {
      newErrors.workshop_name = '공방 이름을 입력해주세요.';
    } else if (formData.role === 'company' && !formData.company_name) {
      newErrors.company_name = '기업 이름을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  }, [formData]);

  // 모든 필수 입력값 및 중복확인이 완료되었는지 확인
  useEffect(() => {
    setIsFormValid(validate() && isEmailChecked && isNicknameChecked);
  }, [formData, isEmailChecked, isNicknameChecked, validate]);

  // input 변경 처리 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
    if (name === 'email') setIsEmailChecked(false);
    if (name === 'nickname') setIsNicknameChecked(false);

    // 입력 시 해당 필드의 오류 메시지 초기화
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    try {
      const response = await axios.post('/api/users/email-check/', {
        email: formData.email,
      });
      if (response.data.available) {
        alert('사용 가능한 이메일입니다.');
        setErrors((prev) => ({ ...prev, email: '' }));
        setIsEmailChecked(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          email: '이미 사용 중인 이메일입니다.',
        }));
        setIsEmailChecked(false);
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        email: '이메일 확인 중 오류가 발생했습니다.',
      }));
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    try {
      const response = await axios.post('/api/users/nickname-check/', {
        nickname: formData.nickname,
      });
      if (response.data.available) {
        alert('사용 가능한 닉네임입니다.');
        setErrors((prev) => ({ ...prev, nickname: '' }));
        setIsNicknameChecked(true);
      } else {
        setErrors((prev) => ({
          ...prev,
          nickname: '이미 사용 중인 닉네임입니다.',
        }));
        setIsNicknameChecked(false);
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        nickname: '닉네임 확인 중 오류가 발생했습니다.',
      }));
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post('/api/users/signup/', formData);
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
          onSubmit={handleSubmit}
          className="w-full max-w-[37.5rem] p-8 rounded space-y-4"
        >
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">이메일*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={handleCheckEmail}
                disabled={isEmailChecked}
                className={`ml-2 px-3 py-1 text-sm rounded ${
                  isEmailChecked
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-[#F28749] text-white'
                }`}
              >
                {isEmailChecked ? '확인 완료' : '중복확인'}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.email}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">비밀번호*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.password}
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">비밀번호 확인*</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.confirm_password}
              </p>
            )}
          </div>

          {/* 이름 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">이름*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.name}
              </p>
            )}
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">닉네임*</label>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={handleCheckNickname}
                disabled={isNicknameChecked}
                className={`ml-2 px-3 py-1 text-sm rounded ${
                  isNicknameChecked
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-[#F28749] text-white'
                }`}
              >
                {isNicknameChecked ? '확인 완료' : '중복확인'}
              </button>
            </div>
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.nickname}
              </p>
            )}
          </div>

          {/*전화번호*/}
          <div className="flex flex-col">
            <div className="flex items-center">
              <label className="w-1/4 text-gray-700 pr-2">전화번호*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-2/4 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.phone}
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
                    name="role"
                    value="workshop"
                    checked={formData.role === 'workshop'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  공방
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="company"
                    checked={formData.role === 'company'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  기업
                </label>
              </div>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1 ml-[25%]">
                {errors.role}
              </p>
            )}
          </div>

          {/* 공방 이름 */}
          {formData.role === 'workshop' && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <label className="w-1/4 text-gray-700 pr-2">공방 이름*</label>
                <input
                  type="text"
                  name="workshop_name"
                  value={formData.workshop_name}
                  onChange={handleChange}
                  className="w-2/4 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              {errors.workshop_name && (
                <p className="text-red-500 text-sm mt-1 ml-[25%]">
                  {errors.workshop_name}
                </p>
              )}
            </div>
          )}

          {/* 기업 이름 */}
          {formData.role === 'company' && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <label className="w-1/4 text-gray-700 pr-2">기업 이름*</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-2/4 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              {errors.company_name && (
                <p className="text-red-500 text-sm mt-1 ml-[25%]">
                  {errors.company_name}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center space-x-2 mt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-4 py-2 rounded ${
                isFormValid
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
