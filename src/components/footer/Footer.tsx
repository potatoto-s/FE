function Footer() {
  return (
    <footer className="absolute bottom-0 w-full h-[300px] bg-gray-100 py-10">
      <div className="mx-auto w-[1300px] h-full flex justify-between items-center text-sm text-[#0F0F0F]">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="font-bold text-lg">핸즈윗</h2>
          <p>
            <span className="font-semibold">입점문의</span>{' '}
            handswith@handswith.com
          </p>
          <p>
            <span className="font-semibold">사업자등록번호</span> 333-43-4433 |{' '}
            <span className="font-semibold">사업자정보확인</span>
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Copyright © 2024 Handswith. All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-col justify-center items-end gap-4">
          <p className="font-bold text-2xl">02.333.0099</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:underline">
              회사소개
            </a>
            <a href="#" className="hover:underline">
              이용안내
            </a>
            <a href="#" className="hover:underline">
              이용약관
            </a>
            <a href="#" className="font-semibold hover:underline">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
