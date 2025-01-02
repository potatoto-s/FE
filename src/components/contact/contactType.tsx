import { GoArrowRight } from 'react-icons/go';

type Props = { label: string; handleNavigation: () => void };
function ContactItem({ label, handleNavigation }: Props) {
  return (
    <>
      <div className="flex justify-between w-[30rem]">
        <p className="my-[2.5rem] text-[1.8rem] font-bold text-[#F28749]">
          {label}
        </p>
        <button onClick={() => handleNavigation()}>
          <GoArrowRight size={50} className="mr-[2rem]" />
        </button>
      </div>
      <div className="w-[30rem] h-[0.2rem] bg-[#6E6E6E]"></div>
    </>
  );
}

export default ContactItem;
