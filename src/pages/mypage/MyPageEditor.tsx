import React, { useState } from 'react';

const MyPageEditor: React.FC = () => {
  const email = 'srchoo19@gmail.com';
  const [name, setName] = useState('추서령');
  const [nickname, setNickname] = useState('Jenna');
  const [phone, setPhone] = useState('010-1234-5678');
  const [workshopName, setWorkshopName] = useState('Jenna');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="p-12 max-w-2xl mx-auto mt-12">
      <h2 className="text-center text-2xl font-bold mb-8 text-[#F28749]">
        마이페이지 수정
      </h2>
      <form className="space-y-6" onSubmit={handleSave}>
        <div>
          <h3 className="text-lg font-semibold mb-4">개인정보</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">이름</label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[375px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              <label className="w-24 text-gray-700 font-medium">이메일</label>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  readOnly
                  className="w-[375px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-24 text-gray-700 font-medium">전화번호</label>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-[375px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">공방 정보</h3>
          <div className="flex items-center">
            <label className="w-24 text-gray-700 font-medium">공방 이름</label>
            <div className="flex-1">
              <input
                type="text"
                placeholder="공방 이름을 입력하세요"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                className="w-[375px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            type="submit"
            className="px-6 py-2 bg-orange-400 text-white font-medium rounded hover:bg-orange-600"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => alert('수정이 취소되었습니다.')}
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
