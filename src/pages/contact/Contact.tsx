import { useNavigate } from 'react-router-dom';
import ContactItem from '../../components/contact/contactItem';

const Contact = () => {
  const navigate = useNavigate();
  const handleNavigation = (typeValue: 'WORKSHOP' | 'COMPANY') => {
    navigate('/contactform', { state: { type: typeValue } });
  };

  return (
    <div
      className="flex flex-col justify-center items-center lg:mr-[40%] mt-[6rem]"
      style={{ height: 'calc(100vh - 25rem' }}
    >
      <h1 className="w-[30rem] text-[#6E6E6E] text-[3.5rem] font-bold mb-[2.5rem]">
        CONTACT
      </h1>
      <div className="w-[30rem] h-[0.2rem] bg-[#6E6E6E]"></div>
      <ContactItem
        label="컨설팅 문의하기"
        handleNavigation={() => handleNavigation('WORKSHOP')}
      />
      <ContactItem
        label="공방 연결 문의하기"
        handleNavigation={() => handleNavigation('COMPANY')}
      />
    </div>
  );
};

export default Contact;
