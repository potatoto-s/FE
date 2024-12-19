import { GoArrowRight } from 'react-icons/go';

const Contact = () => {
  return (
    <div
      className="flex flex-col justify-center items-center lg:mr-[40%]"
      style={{ height: 'calc(100vh - 3rem' }} //헤더,푸터 완성 시 수정 필요
    >
      <h1 className="w-[38rem] text-[#6E6E6E] text-[4.6rem] font-bold mb-[3.1rem]">
        CONTACTaa
      </h1>
      <div className="w-[38rem] h-[0.2rem] bg-[#6E6E6E]"></div>
      <div className="flex justify-between w-[38rem]">
        <p className="my-[2.5rem]  text-[2.5rem] font-bold text-[#F28749]">
          컨설팅 문의하기
        </p>
        <button>
          <GoArrowRight size={60} className="mr-[2rem]" />
        </button>
      </div>
      <div className="w-[38rem] h-[0.2rem] bg-[#6E6E6E]"></div>
      <div className="flex justify-between w-[38rem]">
        <p className="my-[2.5rem]  text-[2.5rem] font-bold text-[#F28749]">
          공방 연결 문의하기
        </p>
        <button>
          <GoArrowRight size={60} className="mr-[2rem]" />
        </button>
      </div>
      <div className="w-[38rem] h-[0.2rem] bg-[#6E6E6E]"></div>
    </div>
  );
};

export default Contact;
