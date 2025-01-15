import { UseFormRegister, FieldValues } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FieldValues>;
  error: string | undefined;
};
function ContactInputContent({ register, error }: Props) {
  return (
    <>
      <label
        htmlFor="content"
        className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE] mb-[2rem]"
      >
        문의 내용*
      </label>
      <textarea
        id="content"
        className="resize-none pl-[0.3rem] md:w-[33rem] w-[28rem] h-[16rem] border-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none "
        {...register('content', {
          required: true,
        })}
      />
      {error && (
        <p className="text-[red] text-[1rem] absolute mt-[20rem]">
          문의 내용을 입력해주세요.
        </p>
      )}
    </>
  );
}

export default ContactInputContent;
