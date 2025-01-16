import { UseFormRegister, FieldValues } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
};
function ContactInputPreferredReply({ register, error }: Props) {
  return (
    <>
      <label
        htmlFor="preferred_contact"
        className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE] mb-[0.5rem]"
      >
        선호 연락 방법 (이메일 / 휴대전화)*
      </label>
      <div className="flex">
        <input
          type="radio"
          value="EMAIL"
          className="mr-[1.4rem]"
          {...register('preferred_contact', {
            required: '선호 연락 방법을 입력해주세요.',
          })}
        />
        <p className="text-[1rem] text-[#AEAEAE] mr-[12rem]">이메일</p>
        <input
          type="radio"
          value="PHONE"
          className="mr-[1rem]"
          {...register('preferred_contact', {
            required: true,
          })}
        />
        <p className="text-[1rem] text-[#AEAEAE]">휴대전화</p>
        {error && (
          <p className="text-[red] text-[1rem] absolute mt-[1.8rem]">
            선호 연락 방법을 입력해주세요.
          </p>
        )}
      </div>
    </>
  );
}

export default ContactInputPreferredReply;
