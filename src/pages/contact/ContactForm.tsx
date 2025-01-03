import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { contactApi } from '../../api/ContactApi';
import ContactInputName from '../../components/contact/contactInputName';
import ContactInputEmail from '../../components/contact/contactInputEmail';
import ContactInputPhone from '../../components/contact/contactInputPhone';
import ContactInputOrganizationName from '../../components/contact/contactInputOrganizationName';
import ContactInputMessage from '../../components/contact/contactInputMessage';
import ContactInputPreferredReply from '../../components/contact/contactInputPreferredReply';

const ContactForm = () => {
  const location = useLocation();
  const { type } = location.state || {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await contactApi(data);
      reset();
      alert('문의가 정상적으로 접수되었습니다.');
    } catch (error) {
      alert('문의가 접수되지 않았습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[4rem]">
      <div className="lg:flex lg:w-[71rem] md:w-[33rem] w-[28rem]">
        <h1 className="text-[#6E6E6E] text-[3.5rem] font-bold mr-[2.3rem] ">
          CONTACT
        </h1>
        {type === 'COMPANY' && (
          <p className="lg:pt-[2.5rem] md:text-[1.2rem] text-[0.8rem] mb-[5rem] font-normal text-[#AEAEAE]">
            공방 연결에 대한 문의를 남겨주시면 담당자가 확인 후
            연락드리겠습니다.
          </p>
        )}
        {type === 'WORKSHOP' && (
          <p className="lg:pt-[2.5rem] md:text-[1.2rem] text-[1rem] mb-[5rem] font-normal text-[#AEAEAE]">
            컨설팅에 대한 문의를 남겨주시면 담당자가 확인 후 연락드리겠습니다.
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mb-[6.8rem]"
      >
        <div className="lg:flex">
          <div className="flex flex-col">
            {/* 이름 */}
            <ContactInputName
              register={register}
              error={errors.name ? '이름을 입력해주세요.' : undefined}
            />
            {/* 이메일 */}
            <ContactInputEmail
              register={register}
              error={errors.email?.message as string | undefined}
            />
            {/* 전화번호 */}
            <ContactInputPhone
              register={register}
              error={errors.phone?.message as string | undefined}
            />
            {/* 기업이름/공방이름 */}
            <ContactInputOrganizationName
              type={type}
              register={register}
              error={errors.organizationName?.message as string | undefined}
            />
          </div>
          <div className="flex flex-col">
            {/* 문의 내용 */}
            <ContactInputMessage
              register={register}
              error={errors.message ? '문의 내용을 입력해주세요.' : undefined}
            />
            {/* 선호 연락 방법 */}
            <ContactInputPreferredReply
              register={register}
              error={
                errors.prefered_reply
                  ? '선호 연락 방법을 입력해주세요.'
                  : undefined
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-base px-8 py-2 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300 mt-[4rem]"
        >
          문의하기
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
