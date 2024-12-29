import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/MainModal';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');
  const [modalImage, setModalImage] = useState<string>('');
  const [modalInfo, setModalInfo] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (
    title: string,
    content: string,
    imageSrc: string,
    info: string
  ) => {
    setModalTitle(title);
    setModalContent(content);
    setModalImage(imageSrc);
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalTitle('');
    setModalContent('');
    setModalImage('');
    setModalInfo('');
    setIsModalOpen(false);
  };

  const handleCommunityClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  const handleDetailClick = (postId: number) => {
    navigate(`/communitydetail/${postId}`);
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
        <div className="flex justify-center ">
          <h2 className="text-left w-[900px] text-3xl font-semibold mb-6">
            추천 공방
          </h2>
        </div>
        <div className="flex justify-center items-center space-x-4 gap-[65px]">
          <div
            className="w-[230px] h-[230px] rounded-full overflow-hidden cursor-pointer shadow-2xl "
            onClick={() =>
              openModal(
                '가죽마을',
                `
                
                Q: 가죽공예를 시작하게 된 계기는 무엇인가요?
                A: "어릴 적부터 수공예에 대한 흥미가 많았어요. 특히 부모님께서 저에게 직접 만들 수 있는 물건을 선물해 주셨던 기억이 납니다. 그러던 중, 우연히 가죽공예에 대한 책을 접하게 되었고, 그 매력에 빠져들게 되었죠. 가죽의 질감과 색감, 그리고 다양한 기법들을 배우는 과정이 정말 즐거웠습니다."

                Q: 작품 제작 시 가장 중요하게 생각하는 것은 무엇인가요?

                A: "저에게 있어 가장 중요한 것은 고객의 요구를 이해하고 그것을 바탕으로 제 창의력을 더하는 것입니다. 고객님들이 원하는 제품을 만들면서도, 저의 개성과 예술성을 담아내려고 노력해요. 그래서 모든 작품이 고객에게 특별하고 의미 있는 존재가 되기를 바랍니다."

                Q: 가죽공예의 매력은 무엇인가요?

                A: "가죽공예는 다른 수공예와는 달리 내구성이 뛰어나고 시간이 지날수록 더욱 멋스러워지는 매력이 있어요. 제가 만든 제품이 시간이 지나면서 고객의 생활 속에서 함께 해주고, 또 그 사용의 흔적이 남는 것을 보는 것이 정말 기쁩니다. 특히, 고객이 애정하는 제품이 될 때의 그 만족감은 이루 말할 수 없죠."

                Q: 앞으로의 계획이 있다면 무엇인가요?

                A: "앞으로 더 많은 사람들과 가죽공예의 즐거움을 나누고 싶어요. 워크숍이나 클래스도 열어보려 합니다. 다양한 사람들과의 소통을 통해 가죽공예의 매력을 더 많은 이들에게 전하고, 함께 창작의 기쁨을 느끼고 싶습니다."
                `,
                '/ex1-1.jpg',
                `공방분야 : 가죽공예
                죽마을은 2020년에 설립된 가죽공예 전문공방입니다.    
                고객 맞춤형 가죽 제품을 제작하며, 
                전통 기법과 현대적 디자인을 결합하여 독창적인 작품을 선보입니다.`
              )
            }
          >
            <img
              src="/workshop1.jpg"
              alt="Workshop 1"
              className="w-full h-full object-cover  "
            />
          </div>
          <div
            className="w-[230px] h-[230px] rounded-full overflow-hidden cursor-pointer shadow-2xl"
            onClick={() =>
              openModal(
                '페이퍼 아트 스튜디오',
                `Q: 종이공예를 시작하게 된 계기는 무엇인가요?

                A: "어렸을 때부터 종이접기를 좋아했어요. 다양한 색의 종이를 활용하여 형상을 만드는 재미에 빠졌고, 이것이 점점 더 깊은 관심으로 발전하게 되었죠. 나중에 종이 공예를 전문적으로 배우고, 제가 만든 작품을 다른 사람들과 나누고 싶다는 마음이 커졌습니다."

                Q: 작품 제작 시 가장 중요하게 생각하는 것은 무엇인가요?

                A: "저에게 가장 중요한 것은 소재의 특성과 활용 가능성을 이해하는 것입니다. 종이는 그 자체로도 아름답지만, 어떤 형태로든 변형할 수 있는 무한한 가능성을 지니고 있어요. 그래서 고객이 원하는 디자인을 듣고, 그에 맞는 최상의 결과물을 만드는 것이 저의 목표입니다."

                Q: 종이공예의 매력은 무엇인가요?

                A: "종이공예는 접근성이 좋고, 다양한 방식으로 창의력을 발휘할 수 있는 매력이 있어요. 누구나 쉽게 시작할 수 있지만, 무궁무진한 가능성을 탐구할 수 있죠. 그리고 종이로 만든 작품은 공간을 아름답게 장식할 뿐만 아니라, 사람들에게 감동을 줄 수 있다는 점이 정말 매력적입니다."

                Q: 앞으로의 계획이 있다면 무엇인가요?

                A:"앞으로는 종이공예 워크숍을 통해 더 많은 분들과 소통하고, 종이의 아름다움과 창의성을 나누고 싶습니다. 아이들과 성인 모두가 즐길 수 있는 프로그램을 마련하여, 종이공예의 즐거움을 함께 느끼고 싶어요."`,
                '/ex1-2.jpeg',
                '종이공방은 2021년에 설립된 종이공예 전문 공방입니다. 다양한 종류의 종이를 활용하여 독창적인 아트 작품과 실용적인 제품을 제작하고 있습니다. 종이접기, 종이 꽃 만들기, 그리고 커스터마이징 제품 등 다양한 종이 공예를 경험할 수 있습니다.'
              )
            }
          >
            <img
              src="/workshop2.jpeg"
              alt="Workshop 2"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div
            className="w-[230px] h-[230px] rounded-full overflow-hidden cursor-pointer shadow-2xl"
            onClick={() =>
              openModal(
                '라탄 아틀리에',
                `Q: 라탄 아트를 선택하게 된 이유는 무엇인가요?

                A: "어릴 때부터 자연을 사랑해왔고, 특히 식물성 재료로 만드는 것에 매력을 느꼈어요. 라탄은 그 자체로도 아름답고, 다양한 디자인이 가능해서 매료되었습니다. 그래서 이를 전문적으로 배우고 작업하게 되었습니다."

                Q: 라탄 아트 작품을 만들 때 가장 중요하게 생각하는 점은 무엇인가요?

                A: "저는 항상 사용자의 편안함과 실용성을 고려합니다. 아름다움도 중요하지만, 최종 제품이 실제로 어떻게 사용될지를 생각하며 디자인하는 것이 가장 중요합니다. 그래서 고객의 피드백을 반영해 더 나은 작품을 만들려고 노력하고 있습니다."

                Q: 라탄 아트를 통해 전달하고 싶은 메시지는 무엇인가요?

                A: "라탄 아트는 자연을 가까이 할 수 있는 좋은 방법이라고 생각합니다. 사람들이 제 작품을 통해 자연의 따뜻함과 편안함을 느끼길 바라요. 그리고 라탄 제품이 집 안의 아늑한 분위기를 더해주길 희망합니다."

                Q: 앞으로의 계획이 있다면 어떤 것이 있나요?

                A: "앞으로 라탄 아트의 다양성을 보여줄 수 있는 전시회를 계획하고 있습니다. 또한, 다양한 연령층을 대상으로 하는 워크숍을 통해 라탄 아트의 매력을 알리고, 더 많은 사람들이 직접 체험할 수 있는 기회를 만들고 싶습니다."`,
                '/ex1-3.jpg',
                `연혁/프로필 (간단한 소개 및 경력사항)

                라탄 아틀리에는 2022년에 설립된 라탄 아트 전문 공방입니다. 자연 소재인 라탄을 활용하여 독창적인 가구와 소품을 제작하고 있습니다. 편안함과 스타일을 모두 갖춘 다양한 제품을 만나볼 수 있으며, 고객 맞춤형 디자인도 제공합니다.`
              )
            }
          >
            <img
              src="/workshop3.jpg"
              alt="Workshop 3"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="flex justify-center">
          <h2 className="text-left text-3xl font-semibold mb-6 w-[900px]">
            화제의 공방
          </h2>
        </div>
        <div className="flex justify-center items-center space-x-4 gap-5">
          <div
            className="w-64 h-40 rounded-lg overflow-hidden cursor-pointer shadow-2xl"
            onClick={() =>
              openModal(
                '나만의 라탄 리스 만들기',
                `클래스 목표 및 기대효과

                목표 : 라탄 공예의 기초를 배우고, 자신만의 리스를 완성하는 것입니다.

                기대효과 : 수강 후, 기본적인 라탄 공예 기술을 습득하고, 창의력을 발휘하여 개인 맞춤형 작품을 제작할 수 있습니다.

                난이도 및 소요 시간
                    
                    - 난이도 : 초급
                    
                    - 소요 시간 : 2시간
                    
                재료 키트 정보
                    - 키트 내용 : 자연 라탄, 디자인 가이드, 필수 공구 (가위, 테이프 등)
                  
                수강료 할인 정보
                    - 정상가 : 50,000원
                    - 할인가 : 40,000원 (사전 예약 시 20% 할인)`,
                '/trend1.jpg',
                '클래스 상세설명 : 이 워크숍에서는 기본적인 라탄 공예 기법을 배우고, 나만의 스타일로 리스를 만들어보는 시간을 가집니다.'
              )
            }
          >
            <img
              src="/trend1.jpg"
              alt="Trend Workshop 1"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div
            className="w-64 h-40 rounded-lg overflow-hidden  cursor-pointer shadow-2xl"
            onClick={() =>
              openModal(
                '나무로 만드는 나만의 이야기를 담은 소품',
                `클래스 목표 및 기대효과

                목표 : 목공의 기본을 배우고, 자신만의 스타일로 나무 소품을 완성하는 것입니다.

                기대효과 : 수업을 통해 각자만의 독창적인 디자인을 탐구하며, 나무를 통해 자신을 표현하는 방법을 배웁니다. 결과적으로, 나만의 이야기를 담은 작품을 만들게 됩니다.

                난이도 및 소요 시간
                    
                    - 난이도 : 초급
                    
                    - 소요 시간 : 3시간
                    
                재료 키트 정보
                    - 키트 내용 : 원목 패널, 디자인 가이드, 필수 공구 (톱, 사포, 본드 등)

                수강료 할인 정보
                    - 정상가 : 70,000원
                    - 할인가 : 56,000원 (사전 예약 시 20% 할인)`,
                '/trend2.jpg',
                '클래스 상세설명 : 이 워크숍에서는 나무의 따뜻함과 질감을 느끼며, 나만의 개성이 담긴 소품을 만들어봅니다.'
              )
            }
          >
            <img
              src="/trend2.jpg"
              alt="Trend Workshop 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="w-64 h-40 rounded-lg overflow-hidden cursor-pointer shadow-2xl"
            onClick={() =>
              openModal(
                '빛과 향으로 그리는 나만의 캔들 이야기',
                `클래스 목표 및 기대효과

                목표 : 캔들 제작의 기본을 배우고, 자신만의 스타일로 독창적인 캔들을 완성하는 것입니다.

                기대효과 : 다양한 재료와 향을 조합하여 나만의 개성이 담긴 캔들을 제작하며, 창의성을 마음껏 표현할 수 있는 기회를 제공합니다.

                ✨🌿 내 손으로 만드는 특별한 캔들, 그 향기와 빛으로 나만의 공간을 채워보세요!

                여러분의 창의력이 담긴 캔들을 만들어보는 이 워크숍에서는, 자연의 향기와 따뜻한 색감을 통해 아늑한 분위기를 연출할 수 있는 방법을 배워요.

                💫 향기로운 순간을 만들어 줄 나만의 캔들, 이제 직접 만들어보세요!

                전문가의 도움으로 초보자도 쉽게 따라 할 수 있는 캔들 제작 기법을 배우며, 소중한 사람들과 나누고 싶은 특별한 작품을 완성해보세요.

                📸 함께 찍은 사진을 공유하며, 이 순간을 영원히 기억해요!

                난이도 및 소요 시간
                    
                    - 난이도: 초급
                    
                    - 소요 시간: 2시간
                    
                재료 키트 정보
                    - 키트 내용 : 다양한 색상의 왁스, 향료, 캔들 용기 및 심지, 디자인 가이드
        
                수강료 할인 정보
                    - 정상가 : 70,000원
                    - 할인가 : 56,000원 (사전 예약 시 20% 할인)`,
                '/trend3.jpg',
                '클래스 상세설명 : 초보자도 쉽게 따라 할 수 있는 캔들 제작 기법을 배우며, 소중한 사람들과 나누고 싶은 특별한 작품을 완성해보세요.'
              )
            }
          >
            <img
              src="/trend3.jpg"
              alt="Trend Workshop 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="flex justify-center">
          <h2 className="text-left text-3xl font-semibold mb-6 w-[900px]">
            Hot Talk
          </h2>
        </div>
        <div className="flex justify-center items-start w-full">
          <div className="w-[900px]">
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">주간 Top 10</h3>
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between bg-white p-3 rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleDetailClick(index + 1)}
                  >
                    <span className="text-gray-600 truncate">
                      제목 {index + 1}
                    </span>
                    <span className="text-orange-500 mr-[250px]">[댓글수]</span>
                    <span className="text-gray-500">작성자</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {[
                '풍선 / 페이퍼아트',
                '선물포장 / 보자기',
                '목공 / 도자기 / 가죽',
                '디퓨저 / 캔들 / 석고 방향제',
                '레진 / 비즈공예',
                '라탄 / 마크라메',
                '플라워',
                '토탈공예',
              ].map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">{category}</h4>
                    <a
                      href={`/category/${index + 1}`}
                      className="text-gray-400 text-sm"
                    >
                      더보기 &gt;
                    </a>
                  </div>
                  <ul className="space-y-2">
                    {Array.from({ length: 5 }).map((_, subIndex) => (
                      <li
                        key={subIndex}
                        className="flex justify-between bg-white p-2 rounded-lg shadow-md cursor-pointer"
                        onClick={() => handleCommunityClick(subIndex + 1)}
                      >
                        <span className="text-gray-700 truncate">
                          예시 제목 {subIndex + 1}
                        </span>
                        <span className="text-orange-500 text-sm">
                          [{subIndex + 1}]
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal
          title={modalTitle}
          content={modalContent}
          imageSrc={modalImage}
          info={modalInfo}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Main;
