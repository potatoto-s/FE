import { UseFormRegister, FieldValues } from 'react-hook-form';

type Props = {
  type: 'COMPANY' | 'WORKSHOP';
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
};
function ContactInputOrganizationName({ type, register, error }: Props) {
  return (
    <>
      {type === 'COMPANY' && (
        <label
          htmlFor="organizationName"
          className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE]"
        >
          기업 이름*
        </label>
      )}
      {type === 'WORKSHOP' && (
        <label
          htmlFor="organizationName"
          className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE]"
        >
          공방 이름*
        </label>
      )}
      <input
        type="text"
        id="organizationName"
        className="pl-[0.3rem] mb-[2.5rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
        {...register('organizationName', {
          required: '회사 이름을 입력해주세요.',
          maxLength: {
            value: 100,
            message: '회사 이름은 100자 이하로 입력해주세요.',
          },
        })}
      />
      {error && (
        <p className="text-[red] text-[1rem] absolute mt-[26.5rem]">{error}</p>
      )}
    </>
  );
}

export default ContactInputOrganizationName;
