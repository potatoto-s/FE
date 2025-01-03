import { UseFormRegister, FieldValues } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
};
function ContactInputPhone({ register, error }: Props) {
  return (
    <>
      <label
        htmlFor="phone"
        className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE]"
      >
        전화번호*
      </label>
      <p className="text-[0.8rem] text-[#AEAEAE]">
        구분자(-)를 포함해 주세요. EX) 010-1234-5678
      </p>
      <input
        type="tel"
        id="phone"
        className="pl-[0.3rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
        {...register('phone', {
          required: '전화번호를 입력해주세요.',
          maxLength: {
            value: 20,
            message: '전화번호는 20자 이하로 입력해주세요.',
          },
          pattern: {
            value: /^\d{2,3}-\d{3,4}-\d{4}$/,
            message: '전화번호 양식에 맞게 입력해주세요.',
          },
        })}
      />
      {error && (
        <p className="text-[red] text-[1rem] absolute mt-[20rem]">{error}</p>
      )}
    </>
  );
}

export default ContactInputPhone;
