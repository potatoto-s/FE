import { useState } from 'react';
import Modal from '../../components/modal/MainModal';

const Main: React.FC = () => {
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');
  const [modalImage, setModalImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (title: string, content: string, imageSrc: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalTitle('');
    setModalContent('');
    setModalImage('');
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      <section className="relative h-80 bg-orange-200 flex items-center justify-center text-center ">
        <div className="relative bg-opacity-50 text-black p-6 rounded">
          <h1 className="text-3xl font-bold mb-4">
            2025년 공예 사업의 새로운 가능성을 발견하세요!
          </h1>
          <p className="mb-2">
            2025년이 시작되었습니다! 새로운 한 해, 공예 사업의 더 큰 가능성을
            열어가세요.
          </p>
          <p className="mb-2">
            공방 사장님들을 위한 맞춤형 지원 프로그램과 성공적인 공방 운영을
            위한 최신 트렌드, 실질적인 팁을 제공해 드립니다.
          </p>
          <p className="font-semibold">"지금, 당신의 공방을 돌아보세요!"</p>
          <p className="mt-4">
            지역 공방 네트워크와의 협업 기회를 확대하고, 더 많은 고객에게 다가갈
            수 있는 판매 채널도 제안합니다.
          </p>
          <p className="mt-2">
            지금 바로 커뮤니티에 가입하셔서 특별한 혜택과 함께 새로운 영감을
            얻어보세요!
          </p>
        </div>
      </section>

      <section className="py-10 bg-white">
        <h2 className="text-center text-3xl font-semibold mb-6">추천공방</h2>
        <div className="flex justify-center items-center space-x-4">
          <div
            className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-md cursor-pointer"
            onClick={() =>
              openModal(
                '가죽마을',
                '가죽마을은 2020년에 설립된 가죽공예 전문 공방입니다. 고객 맞춤형 가죽 제품을 제작하며, 전통 기법과 현대적 디자인을 결합하여 독창적인 작품을 선보입니다. 핸드백, 지갑, 벨트 등 다양한 제품을 만나보실 수 있습니다. ',
                '/ex1-1.jpg'
              )
            }
          >
            <img
              src="/workshop11111.jpg"
              alt="Workshop 1"
              className="w-full h-full object-cover "
            />
          </div>
          <div
            className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-md cursor-pointer"
            onClick={() =>
              openModal(
                'Workshop 2',
                '종이공방은 2021년에 설립된 종이공예 전문 공방입니다. 다양한 종류의 종이를 활용하여 독창적인 아트 작품과 실용적인 제품을 제작하고 있습니다. 종이접기, 종이 꽃 만들기, 그리고 커스터마이징 제품 등 다양한 종이 공예를 경험할 수 있습니다.',
                '/ex1-2.jpeg'
              )
            }
          >
            <img
              src="/workdshop22.jpeg"
              alt="Workshop 2"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div
            className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-md cursor-pointer"
            onClick={() =>
              openModal(
                'Workshop 3',
                '라탄 아틀리에는 2022년에 설립된 라탄 아트 전문 공방입니다. 자연 소재인 라탄을 활용하여 독창적인 가구와 소품을 제작하고 있습니다. 편안함과 스타일을 모두 갖춘 다양한 제품을 만나볼 수 있으며, 고객 맞춤형 디자인도 제공합니다.',
                '/ex1-3.jpg'
              )
            }
          >
            <img
              src="/workshop33.jpg"
              alt="Workshop 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <h2 className="text-center text-3xl font-semibold mb-6">
          트렌드 워크숍
        </h2>
        <div className="flex justify-center items-center space-x-4 gap-5">
          <div
            className="w-64 h-40 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() =>
              openModal(
                '나만의 라탄 리스 만들기',
                `
                클래스 상세설명 : 이 워크숍에서는 기본적인 라탄 공예 기법을 배우고, 나만의 스타일로 리스를 만들어보는 시간을 가집니다.
                
                * 클래스 목표 및 기대효과
                
                - 목표: 라탄 공예의 기초를 배우고, 자신만의 리스를 완성하는 것입니다.
                - 기대효과: 수강 후, 기본적인 라탄 공예 기술을 습득하고, 창의력을 발휘하여 개인 맞춤형 작품을 제작할 수 있습니다.
    
                * 난이도: 초급
    
                * 소요 시간: 2시간
    
                * 재료 키트 정보
                - 키트 내용 : 자연 라탄, 디자인 가이드, 필수 공구 (가위, 테이프 등)
          
                * 수강료 할인 정보
                - 정상가: 50,000원
                - 할인가: 40,000원 (사전 예약 시 20% 할인)`,
                '/trend1111.jpg'
              )
            }
          >
            <img
              src="/trend1111.jpg"
              alt="Trend Workshop 1"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div
            className="w-64 h-40 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() =>
              openModal(
                '나무로 만드는 나만의 이야기를 담은 소품',
                `
                - 클래스 상세설명 : 이 워크숍에서는 나무의 따뜻함과 질감을 느끼며, 나만의 개성이 담긴 소품을 만들어봅니다.

                * 클래스 목표 및 기대효과

                - 목표: 목공의 기본을 배우고, 자신만의 스타일로 나무 소품을 완성하는 것입니다.
              
                - 기대효과: 수업을 통해 각자만의 독창적인 디자인을 탐구하며, 나무를 통해 자신을 표현하는 방법을 배웁니다. 결과적으로, 나만의 이야기를 담은 작품을 만들게 됩니다.

                * 난이도 : 초급
                
                * 소요 시간 : 3시간
                
                * 재료 키트 정보
                - 키트 내용 : 원목 패널, 디자인 가이드, 필수 공구 (톱, 사포, 본드 등)

                * 수강료 할인 정보
                - 정상가: 70,000원
                - 할인가: 56,000원 (사전 예약 시 20% 할인)

                `,
                '/trend222.jpg'
              )
            }
          >
            <img
              src="/trend222.jpg"
              alt="Trend Workshop 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="w-64 h-40 rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() =>
              openModal(
                '빛과 향으로 그리는 나만의 캔들 이야기',
                `
                - 클래스 상세설명 :초보자도 쉽게 따라 할 수 있는 캔들 제작 기법을 배우며, 소중한 사람들과 나누고 싶은 특별한 작품을 완성해보세요.

                * 클래스 목표 및 기대효과

                - 목표: 캔들 제작의 기본을 배우고, 자신만의 스타일로 독창적인 캔들을 완성하는 것입니다.

                - 기대효과: 수업을 통해 각자만의 독창적인 디자인을 탐구하며, 나무를 통해 자신을 표현하는 방법을 배웁니다. 결과적으로, 나만의 이야기를 담은 작품을 만들게 됩니다.

                * 난이도 : 초급
                
                * 소요 시간 : 2시간
                
                * 재료 키트 정보
                - 키트 내용 : 다양한 색상의 왁스, 향료, 캔들 용기 및 심지, 디자인 가이드

                * 수강료 할인 정보
                - 정상가: 70,000원
                - 할인가: 56,000원 (사전 예약 시 20% 할인)

                `,
                '/trend33.jpg'
              )
            }
          >
            <img
              src="/trend33.jpg"
              alt="Trend Workshop 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal
          title={modalTitle}
          content={modalContent}
          imageSrc={modalImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Main;
