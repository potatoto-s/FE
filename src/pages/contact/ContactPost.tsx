import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ContactPost = () => {
  const location = useLocation();
  const { type } = location.state || {};
  console.log(type);

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
  };

  return (
    <div
      className="flex flex-col justify-center items-center"
      //   style={{ height: 'calc(100vh - 3rem' }}
    >
      <div className="lg:flex lg:w-[81rem]">
        <h1 className="text-[#6E6E6E] text-[4.6rem] font-bold mr-[2.3rem]">
          CONTACT
        </h1>
        {type === 'studioConnection' && (
          <p className="text-center lg:pt-[2.8rem] text-[2rem] lg:mb-[8.1rem] md:mb-[5rem] font-normal text-[#AEAEAE]">
            공방 연결에 대한 문의를 남겨주시면 담당자가 확인 후
            연락드리겠습니다.
          </p>
        )}
        {type === 'consulting' && (
          <p className="text-center lg:pt-[2.8rem] text-[2rem] lg:mb-[8.1rem] md:mb-[5rem] font-normal text-[#AEAEAE]">
            컨설팅에 대한 문의를 남겨주시면 담당자가 확인 후 연락드리겠습니다.
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[80rem] w-[40rem] flex flex-col items-center"
      >
        <div className="lg:flex">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
            >
              이름
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
              이메일
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="text"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
            <label
              htmlFor="phone"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
            >
              전화번호
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
            {type === 'studioConnection' && (
              <label
                htmlFor="organizationName"
                className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
              >
                기업 이름
              </label>
            )}
            {type === 'consulting' && (
              <label
                htmlFor="organizationName"
                className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
              >
                공방 이름
              </label>
            )}
            <input
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              type="text"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="content"
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE] mb-[2rem]"
            >
              문의 내용
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
              className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]"
            >
              선호 연락 방법 (이메일 / 휴대전화)
            </label>
            <input
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              type="text"
              className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none "
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-[7rem] mt-[6rem] h-[2.5rem] bg-[#F28749] text-[#FFFFFF] text-[1rem] font-bold rounded-[0.5rem]"
        >
          문의하기
        </button>
      </form>
    </div>
  );
};

export default ContactPost;
