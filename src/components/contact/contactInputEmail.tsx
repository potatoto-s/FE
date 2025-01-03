import { UseFormRegister, FieldValues } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
};
function ContactInputEmail({ register, error }: Props) {
  return (
    <>
      <label
        htmlFor="email"
        className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE]"
      >
        이메일*
      </label>
      <p className="text-[0.8rem] text-[#AEAEAE]">
        이메일 형식을 지켜서 입력해 주세요. EX) example@domain.com
      </p>
      <input
        type="text"
        id="email"
        className="pl-[0.3rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
        {...register('email', {
          required: '이메일을 입력해주세요.',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '이메일 양식에 맞게 입력해주세요.',
          },
        })}
      />
      {error && (
        <p className="text-[red] text-[1rem] absolute mt-[12rem]">{error}</p>
      )}
    </>
  );
}

export default ContactInputEmail;
