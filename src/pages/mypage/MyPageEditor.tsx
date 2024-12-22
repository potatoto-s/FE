import React, { useState } from 'react';

const MyPageEditor: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [workshopName, setWorkshopName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassowrd) {
      alert('비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
      return;
    }

    const formData = {
      email,
      password,
      name,
      nickname,
      phone,
      role,
      workshopName: role === 'workshop' ? workshopName : '',
      companyName: role === 'company' ? companyName : '',
    };

    console.log(formData);
    alert('회원가입이 완료 되었습니다');
  };

  return (
    <div className="p-12 max-w-2xl mx-auto mt-12">
      <h2 className="text-center text-2xl font-bold mb-8 text-[#F28749]">
        회원가입
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-semibold mb-4">가입정보</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">이메일</label>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="button"
                className="ml-4 px-4 py-2 bg-orange-400 border text-white rounded hover:bg-orange-500"
              >
                중복확인
              </button>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">비밀번호</label>
              <div className="flex-1">
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full max-w-[calc(100%-6.5rem)] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">
                비밀번호 확인
              </label>
              <div className="flex-1">
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassowrd}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full  max-w-[calc(100%-6.5rem)] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">이름</label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full  max-w-[calc(100%-6.5rem)] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">닉네임</label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <button
                type="button"
                className="ml-4 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
              >
                중복확인
              </button>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">전화번호</label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full  max-w-[calc(100%-6.5rem)] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">회원구분</h3>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="role"
                value="workshop"
                checked={role === 'workshop'}
                onChange={() => setRole('workshop')}
                className="mr-2"
              />
              공방
            </label>
            <div className="flex-1">
              <input
                type="text"
                placeholder="공방 이름"
                value={role === 'workshop' ? workshopName : ''}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="ml-8  w-full  max-w-[calc(100%-8.5rem)] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="company"
                checked={role === 'company'}
                onChange={() => setRole('company')}
                className="mr-2"
              />
              기업
            </label>
            <div className="flex-1">
              <input
                type="text"
                placeholder="기업 이름"
                value={role === 'company' ? companyName : ''}
                onChange={(e) => setCompanyName(e.target.value)}
                className="ml-8  w-full  max-w-[calc(100%-8.5rem)] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-400 text-white font-medium rounded hover:bg-orange-600 "
          >
            회원가입
          </button>
          <button
            type="button"
            onClick={() => alert('취소되었습니다.')}
            className="px-6 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPageEditor;
