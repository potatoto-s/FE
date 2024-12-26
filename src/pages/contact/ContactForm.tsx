import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const location = useLocation();
  const { type } = location.state || {};
  const {
    register,
    handleSubmit,
    // setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    // try {
    //   const response = await axios.post(
    //     "/api/contact/",
    //     {

    //     }
    //   )
    //   if (response.status === 201) {
    //     alert('문의가 정상적으로 접수되었습니다.')
    //   }
    // } catch (error) {
    //   alert('문의가 접수되지 않았습니다. 다시 시도해주세요.')
    // }
    // const requiredFields = [
    //   'name',
    //   'email',
    //   'phone',
    //   'organizationName',
    //   'content',
    //   'preferredContact',
    // ];

    // for (let field of requiredFields) {
    //   if (!data[field]) {
    //     setError(field, {
    //       type: 'manual',
    //       message: '필수 입력 값을 모두 입력해주세요',
    //     });
    //     return;
    //   }
    // }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[4rem]">
      <div className="lg:flex lg:w-[75rem] mt-[7rem]">
        <h1 className="text-[#6E6E6E] text-[4rem] font-bold mr-[2.3rem] ">
          CONTACT
        </h1>
        {type === 'COMPANY' && (
          <p className="text-center lg:pt-[2.8rem] text-[1.5rem] lg:mb-[6rem] md:mb-[4rem] font-normal text-[#AEAEAE]">
            공방 연결에 대한 문의를 남겨주시면 담당자가 확인 후
            연락드리겠습니다.
          </p>
        )}
        {type === 'WORKSHOP' && (
          <p className="text-center lg:pt-[2.8rem] text-[1.5rem] lg:mb-[6rem] md:mb-[4rem] font-normal text-[#AEAEAE]">
            컨설팅에 대한 문의를 남겨주시면 담당자가 확인 후 연락드리겠습니다.
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[80rem] w-[40rem] flex flex-col items-center mb-[6.8rem]"
      >
        <div className="lg:flex">
          <div className="flex flex-col">
            {/* 이름 */}
            <label
              htmlFor="name"
              className="w-[35rem] text-[1.4rem] text-[#AEAEAE]"
            >
              이름*
            </label>
            <input
              type="text"
              className="pl-[0.3rem] w-[35rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
              {...register('name', { required: '이름을 입력해주세요.' })}
            />
            {errors.name && (
              <p className="text-[red] text-[1rem] absolute mt-[4.5rem]">
                {errors.name.message}
              </p>
            )}
            {/* 이메일 */}
            <label
              htmlFor="email"
              className="w-[35rem] text-[1.4rem] text-[#AEAEAE]"
            >
              이메일*
            </label>
            <input
              type="email"
              className="pl-[0.3rem] w-[35rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
              {...register('email', { required: '이메일을 입력해주세요.' })}
            />
            {errors.email && (
              <p className="text-[red] text-[1rem] absolute mt-[11.5rem]">
                {errors.email.message}
              </p>
            )}
            {/* 전화번호 */}
            <label
              htmlFor="phone"
              className="w-[35rem] text-[1.4rem] text-[#AEAEAE]"
            >
              전화번호*
            </label>
            <input
              type="tel"
              // pattern="^\d{9,11}$"
              className="pl-[0.3rem] w-[35rem] h-[2.3rem] border-b-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
              {...register('phone', {
                required: '전화번호를 입력해주세요.',
                maxLength: {
                  value: 20,
                  message: '전화번호는 20자 이하로 입력해주세요.',
                },
              })}
            />
            {errors.phone && (
              <p className="text-[red] text-[1rem] absolute mt-[18.5rem]">
                {errors.phone.message}
              </p>
            )}
            {/* 기업이름/공방이름 */}
            {type === 'COMPANY' && (
              <label
                htmlFor="organizationName"
                className="w-[35rem] text-[1.4rem] text-[#AEAEAE]"
              >
                기업 이름*
              </label>
            )}
            {type === 'WORKSHOP' && (
              <label
                htmlFor="organizationName"
                className="w-[35rem] text-[1.4rem] text-[#AEAEAE]"
              >
                공방 이름*
              </label>
            )}
            <input
              type="text"
              className="pl-[0.3rem] mb-[2.5rem] w-[35rem] h-[2.3rem] border-b-2 border-[#AEAEAE] focus:outline-none mr-[4.5rem] "
              {...register('organizationName', {
                required: '회사 이름을 입력해주세요.',
                maxLength: {
                  value: 100,
                  message: '회사 이름은 100자 이하로 입력해주세요.',
                },
              })}
            />
            {errors.organizationName && (
              <p className="text-[red] text-[1rem] absolute mt-[25.5rem]">
                {errors.organizationName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            {/* 문의 내용 */}
            <label
              htmlFor="content"
              className="w-[35rem] text-[1.4rem] text-[#AEAEAE] mb-[2rem]"
            >
              문의 내용*
            </label>
            <textarea
              className="resize-none pl-[0.3rem] w-[35rem] h-[14rem] border-2 mb-[2.5rem] border-[#AEAEAE] focus:outline-none "
              {...register('content', {
                required: '문의 내용을 입력해주세요.',
              })}
            />
            {errors.content && (
              <p className="text-[red] text-[1rem] absolute mt-[18.5rem]">
                {errors.content.message}
              </p>
            )}
            {/* 선호 연락 방법 */}
            <label
              htmlFor="preferredContact"
              className="w-[35rem] text-[1.4rem] text-[#AEAEAE] mb-[0.5rem]"
            >
              선호 연락 방법 (이메일 / 휴대전화)*
            </label>
            <div className="flex">
              <input
                type="radio"
                value="email"
                className="mr-[1.4rem]"
                {...register('preferredContact', {
                  required: '선호 연락 방법을 입력해주세요.',
                })}
              />
              <p className="text-[1.2rem] text-[#AEAEAE] mr-[12rem]">이메일</p>
              <input
                type="radio"
                value="phone"
                className="mr-[1rem]"
                {...register('preferredContact', {
                  required: '선호 연락 방법을 입력해주세요.',
                })}
              />
              <p className="text-[1.2rem] text-[#AEAEAE]">휴대전화</p>
              {errors.preferredContact && (
                <p className="text-[red] text-[1rem] absolute mt-[2.5rem]">
                  {errors.preferredContact.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="text-base px-8 py-2 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300 lg:mt-[6rem] mt-[4rem]"
          >
            문의하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
