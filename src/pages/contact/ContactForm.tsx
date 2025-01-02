import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { contactApi } from '../../api/ContactApi';

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
      <div className="lg:flex lg:w-[71rem] md:w-[33rem] w-[28rem]  mt-[5rem]">
        <h1 className="text-[#6E6E6E] text-[3.5rem] font-bold mr-[2.3rem] ">
          CONTACT
        </h1>
        {type === 'COMPANY' && (
          <p className="lg:pt-[2.5rem] md:text-[1.2rem] text-[0.8rem] mb-[4rem] font-normal text-[#AEAEAE]">
            공방 연결에 대한 문의를 남겨주시면 담당자가 확인 후
            연락드리겠습니다.
          </p>
        )}
        {type === 'WORKSHOP' && (
          <p className="lg:pt-[2.5rem] md:text-[1.2rem] text-[1rem] mb-[4rem] font-normal text-[#AEAEAE]">
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
            <label
              htmlFor="name"
              className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE]"
            >
              이름*
            </label>
            <input
              type="text"
              className="pl-[0.3rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
              {...register('name', { required: true })}
            />
            {errors.name && (
              <p className="text-[red] text-[1rem] absolute mt-[4.5rem]">
                이름을 입력해주세요.
              </p>
            )}
            {/* 이메일 */}
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
              className="pl-[0.3rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
            />
            {errors.email?.type === 'required' && (
              <p className="text-[red] text-[1rem] absolute mt-[12rem]">
                이메일을 입력해주세요.
              </p>
            )}
            {errors.email?.type === 'pattern' && (
              <p className="text-[red] text-[1rem] absolute mt-[12rem]">
                이메일 양식에 맞게 입력해주세요.
              </p>
            )}
            {/* 전화번호 */}
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
              // pattern="^\d{2,3}-\d{3,4}-\d{4}$"
              className="pl-[0.3rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
              {...register('phone', {
                required: true,
                maxLength: {
                  value: 20,
                  message: '전화번호는 20자 이하로 입력해주세요.',
                },
                pattern: /^\d{2,3}-\d{3,4}-\d{4}$/,
              })}
            />
            {errors.phone?.type === 'required' && (
              <p className="text-[red] text-[1rem] absolute mt-[20rem]">
                전화번호를 입력해주세요.
              </p>
            )}
            {errors.phone?.type === 'maxLength' && (
              <p className="text-[red] text-[1rem] absolute mt-[20rem]">
                전화번호는 20자 이하로 입력해주세요.
              </p>
            )}
            {errors.phone?.type === 'pattern' && (
              <p className="text-[red] text-[1rem] absolute mt-[20rem]">
                전화번호 양식에 맞게 입력해주세요.
              </p>
            )}
            {/* 기업이름/공방이름 */}
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
              className="pl-[0.3rem] mb-[2.5rem] md:w-[33rem] w-[28rem] h-[2.3rem] border-b-2 border-[#AEAEAE] focus:outline-none lg:mr-[4.5rem] "
              {...register('organizationName', {
                required: true,
                maxLength: {
                  value: 100,
                  message: '회사 이름은 100자 이하로 입력해주세요.',
                },
              })}
            />
            {errors.organizationName?.type === 'required' && (
              <p className="text-[red] text-[1rem] absolute mt-[26.5rem]">
                회사 이름을 입력해주세요.
              </p>
            )}
            {errors.organizationName?.type === 'maxLength' && (
              <p className="text-[red] text-[1rem] absolute mt-[26.5rem]">
                회사 이름은 100자 이하로 입력해주세요.
              </p>
            )}
          </div>

          <div className="flex flex-col">
            {/* 문의 내용 */}
            <label
              htmlFor="message"
              className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE] mb-[2rem]"
            >
              문의 내용*
            </label>
            <textarea
              className="resize-none pl-[0.3rem] md:w-[33rem] w-[28rem] h-[16rem] border-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none "
              {...register('message', {
                required: true,
              })}
            />
            {errors.message && (
              <p className="text-[red] text-[1rem] absolute mt-[20rem]">
                문의 내용을 입력해주세요.
              </p>
            )}
            {/* 선호 연락 방법 */}
            <label
              htmlFor="prefered_reply"
              className="lg:w-[33rem] w-[28rem] text-[1.2rem] text-[#AEAEAE] mb-[0.5rem]"
            >
              선호 연락 방법 (이메일 / 휴대전화)*
            </label>
            <div className="flex">
              <input
                type="radio"
                value="email"
                className="mr-[1.4rem]"
                {...register('prefered_reply', {
                  required: '선호 연락 방법을 입력해주세요.',
                })}
              />
              <p className="text-[1rem] text-[#AEAEAE] mr-[12rem]">이메일</p>
              <input
                type="radio"
                value="phone"
                className="mr-[1rem]"
                {...register('prefered_reply', {
                  required: true,
                })}
              />
              <p className="text-[1rem] text-[#AEAEAE]">휴대전화</p>
              {errors.prefered_reply && (
                <p className="text-[red] text-[1rem] absolute mt-[1.8rem]">
                  선호 연락 방법을 입력해주세요.
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-base px-8 py-2 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300 lg:mt-[6rem] mt-[4rem]"
        >
          문의하기
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
