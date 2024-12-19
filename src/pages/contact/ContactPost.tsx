import { useLocation } from 'react-router-dom';

const ContactPost = () => {
  const location = useLocation();
  const { type } = location.state || {};
  console.log(type);

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
      <div className="lg:flex">
        <div className="flex flex-col">
          <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]">이름</p>
          <input
            type="text"
            className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
          />
          <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]">이메일</p>
          <input
            type="text"
            className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
          />
          <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]">전화번호</p>
          <input
            type="text"
            className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
          />
          {type === 'studioConnection' && (
            <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]">
              기업 이름
            </p>
          )}
          {type === 'consulting' && (
            <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]">
              공방 이름
            </p>
          )}
          <input
            type="text"
            className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
          />
        </div>
        <div className="flex flex-col">
          <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE] mb-[2rem]">
            문의 내용
          </p>
          <textarea className="pl-[0.3rem] w-[38.5rem] h-[14.4rem] border-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none " />
          <p className="w-[38.5rem] text-[1.5rem] text-[#AEAEAE]">
            선호 연락 방법 (이메일 / 휴대전화)
          </p>
          <input
            type="text"
            className="pl-[0.3rem] w-[38.5rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none "
          />
        </div>
      </div>
      <button className="mt-[6rem] w-[7rem] h-[2.5rem] bg-[#F26749] text-[#FFFFFF] text-[1rem] font-bold rounded-[0.5rem]">
        문의하기
      </button>
    </div>
  );
};

export default ContactPost;
