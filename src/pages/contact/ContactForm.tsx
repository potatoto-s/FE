import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContactForm = () => {
  const location = useLocation();
  const { type } = location.state || {};
  const [errorMessage, setErrorMessage] = useState<string>(' ');

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      preferredContact: e.target.value,
    });
  };

  //입력 폼 데이터
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationName: '',
    content: '',
    preferredContact: '',
    inquiryType: type,
  });

  // 입력 값 업데이트
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //폼 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      'name',
      'email',
      'phone',
      'organizationName',
      'content',
      'preferredContact',
    ];

    // 하나라도 비어 있으면 에러 메시지 출력
    for (let field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        setErrorMessage('필수 입력 값을 모두 입력해주세요');
        return; // 필수 입력값이 부족하면 더 이상 진행하지 않음
      }
    }

    console.log(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organizationName: '',
      content: '',
      preferredContact: '',
      inquiryType: type,
    });
    setErrorMessage('');
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[6rem]">
      <div className="lg:flex lg:w-[81rem] mt-[7rem]">
        <h1 className="text-[#6E6E6E] text-[4.6rem] font-bold mr-[2.3rem] ">
          CONTACT
        </h1>
        {type === 'COMPANY' && (
          <p className="text-center lg:pt-[2.8rem] text-[2rem] lg:mb-[8.1rem] md:mb-[5rem] font-normal text-[#AEAEAE]">
            공방 연결에 대한 문의를 남겨주시면 담당자가 확인 후
            연락드리겠습니다.
          </p>
        )}
        {type === 'WORKSHOP' && (
          <p className="text-center lg:pt-[2.8rem] text-[2rem] lg:mb-[8.1rem] md:mb-[5rem] font-normal text-[#AEAEAE]">
            컨설팅에 대한 문의를 남겨주시면 담당자가 확인 후 연락드리겠습니다.
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80rem] w-[40rem] flex flex-col items-center mb-[6.8rem]"
      >
        <div className="lg:flex">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
            >
              이름*
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
            <label
              htmlFor="email"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
            >
              이메일*
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
            <label
              htmlFor="phone"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
            >
              전화번호*
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              pattern="^\d{9,11}$" //9~11개의 숫자만
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
            {type === 'COMPANY' && (
              <label
                htmlFor="organizationName"
                className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
              >
                기업 이름*
              </label>
            )}
            {type === 'WORKSHOP' && (
              <label
                htmlFor="organizationName"
                className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
              >
                공방 이름*
              </label>
            )}
            <input
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              type="text"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[6rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE] mb-[2rem]"
            >
              문의 내용*
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="pl-[0.3rem] w-[38.5rem] h-[14.4rem] border-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none "
            />
            <label
              htmlFor="preferredContact"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE] mb-[0.5rem]"
            >
              선호 연락 방법 (이메일 / 휴대전화)*
            </label>
            <div className="flex">
              <input
                type="radio"
                name="preferredContact"
                value={'EMAIL'}
                onChange={handleRadio}
                className="mr-[1rem]"
              />
              <p className="text-[1.2rem] text-[#AEAEAE] mr-[12rem]">이메일</p>
              <input
                type="radio"
                name="preferredContact"
                value={'PHONE'}
                onChange={handleRadio}
                className="mr-[1rem]"
              />
              <p className="text-[1.2rem] text-[#AEAEAE]">휴대전화</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="absolute bottom-[0.1rem] text-[1.2rem] text-[red] mb-[1rem]">
            {errorMessage}
          </p>
          <button
            type="submit"
            className="text-base px-8 py-2 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300"
          >
            문의하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
