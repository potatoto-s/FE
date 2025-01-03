import { UseFormRegister, FieldValues } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
};
function ContactInputName({ register, error }: Props) {
  return (
    <>
      <label
        htmlFor="name"
        className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE]"
      >
        이름*
      </label>
      <input
        type="text"
        id="name"
        className="pl-[0.3rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
        {...register('name', { required: true })}
      />
      {error && (
        <p className="text-[red] text-[1rem] absolute mt-[4.5rem]">
          이름을 입력해주세요.
        </p>
      )}
    </>
  );
}

export default ContactInputName;
