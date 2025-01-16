import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/modal/MainModal';
import { TbThumbUp } from 'react-icons/tb';
import { fetchPostList } from '@api/PostList';
import { fetchCategoryPostList } from '@api/CategoryApi';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const [modalState, setModalState] = useState({
    title: '',
    content: '',
    image: '',
    info: '',
    isOpen: false,
  });

  const categories = [
    { id: 'BALLOON', label: '풍선 / 페이퍼아트' },
    { id: 'GIFT', label: '선물포장 / 보자기' },
    { id: 'WOOD', label: '목공 / 도자기 / 가죽' },
    { id: 'DIFFUSER', label: '디퓨저 / 캔들 / 석고 방향제' },
    { id: 'RESIN', label: '레진 / 비즈공예' },
    { id: 'RATTAN', label: '라탄 / 마크라메' },
    { id: 'FLOWER', label: '플라워' },
    { id: 'TOTAL', label: '토탈공예' },
  ];

  const [posts, setPosts] = useState<Record<string, any[]>>({});
  const [topTenPosts, setTopTenPosts] = useState<any[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        // 좋아요데이터 요청
        const topLikedResponse = await fetchPostList({
          top_liked: true,
          limit: 10,
        });
        setTopTenPosts(topLikedResponse.data);

        // 카테고리별 데이터 요청
        const categoryPosts: Record<string, any[]> = {};
        for (const category of categories) {
          const data = await fetchCategoryPostList(category.id); // 카테고리별 데이터 요청
          categoryPosts[category.id] = data.slice(0, 5); // 게시글 5개씩
        }
        setPosts(categoryPosts);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    }

    loadPosts();
  }, []);
  const openModal = (
    title: string,
    content: string,
    imageSrc: string,
    info: string
  ) => {
    setModalState({
      title,
      content,
      image: imageSrc,
      info,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModalState({
      title: '',
      content: '',
      image: '',
      info: '',
      isOpen: false,
    });
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      <section className="relative h-80 bg-[#FDCF8B] flex items-center justify-center text-center px-4 md:px-6 lg:px-8 overflow-hidden">
        <div className="relative bg-opacity-50 text-black p-6 rounded max-w-screen-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            2025년 공예 사업의 새로운 가능성을 발견하세요!
          </h1>
          <p className="text-sm md:text-base">
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
          <h2 className="text-left w-[900px] text-3xl font-semibold mb-6  ">
            추천 공방
          </h2>
        </div>
        <div className="flex justify-center flex-wrap  space-x-4  gap-6 sm:gap-8 lg:gap-10">
          <div
            className="w-[230px] h-[230px] rounded-full overflow-hidden cursor-pointer shadow-2xl "
            onClick={() =>
              openModal(
                '가죽마을',
                `
                
                Q: 시작하게 된 계기는 무엇인가요?\n A: "어릴 적부터 수공예에 대한 흥미가 많았어요. 특히 부모님께서 저에게 직접 만들 수 있는 물건을 선물해 주셨던 기억이 납니다. 그러던 중, 우연히 가죽공예에 대한 책을 접하게 되었고, 그 매력에 빠져들게 되었죠. 가죽의 질감과 색감, 그리고 다양한 기법들을 배우는 과정이 정말 즐거웠습니다."\nQ: 작품 제작 시 가장 중요하게 생각하는 것은 무엇인가요?\nA: "저에게 있어 가장 중요한 것은 고객의 요구를 이해하고 그것을 바탕으로 제 창의력을 더하는 것입니다. 고객님들이 원하는 제품을 만들면서도, 저의 개성과 예술성을 담아내려고 노력해요. 그래서 모든 작품이 고객에게 특별하고 의미 있는 존재가 되기를 바랍니다."\nQ: 매력은 무엇인가요?\nA: "가죽공예는 다른 수공예와는 달리 내구성이 뛰어나고 시간이 지날수록 더욱 멋스러워지는 매력이 있어요. 제가 만든 제품이 시간이 지나면서 고객의 생활 속에서 함께 해주고, 또 그 사용의 흔적이 남는 것을 보는 것이 정말 기쁩니다. 특히, 고객이 애정하는 제품이 될 때의 그 만족감은 이루 말할 수 없죠."\nQ: 앞으로의 계획이 있다면 무엇인가요?\nA: "앞으로 더 많은 사람들과 가죽공예의 즐거움을 나누고 싶어요. 워크숍이나 클래스도 열어보려 합니다. 다양한 사람들과의 소통을 통해 가죽공예의 매력을 더 많은 이들에게 전하고, 함께 창작의 기쁨을 느끼고 싶습니다."
                `,
                '/ex1-1.jpg',
                `
                가죽마을은 2020년에 설립된 가죽공예 전문 공방으로, 고객의 요청에 맞춘 맞춤형 가죽 제품 제작을 전문으로 하고 있습니다. \n전통적인 제작 기법을 기반으로 하여 현대적인 디자인을 접목함으로써, 실용적이면서도 독창적인 작품을 만들어내고 있습니다. 핸드백, 지갑, 벨트 등 다양한 제품을 선보입니다
                `
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
                `Q: 시작하게 된 계기는 무엇인가요?\nA: "어렸을 때부터 종이접기를 좋아했어요. 다양한 색의 종이를 활용하여 형상을 만드는 재미에 빠졌고, 이것이 점점 더 깊은 관심으로 발전하게 되었죠. 나중에 종이 공예를 전문적으로 배우고, 제가 만든 작품을 다른 사람들과 나누고 싶다는 마음이 커졌습니다."\nQ: 작품 제작 시 가장 중요하게 생각하는 것은 무엇인가요?\nA: "저에게 가장 중요한 것은 소재의 특성과 활용 가능성을 이해하는 것입니다. 종이는 그 자체로도 아름답지만, 어떤 형태로든 변형할 수 있는 무한한 가능성을 지니고 있어요. 그래서 고객이 원하는 디자인을 듣고, 그에 맞는 최상의 결과물을 만드는 것이 저의 목표입니다."\nQ: 매력은 무엇인가요?\nA: "종이공예는 접근성이 좋고, 다양한 방식으로 창의력을 발휘할 수 있는 매력이 있어요. 누구나 쉽게 시작할 수 있지만, 무궁무진한 가능성을 탐구할 수 있죠. 그리고 종이로 만든 작품은 공간을 아름답게 장식할 뿐만 아니라, 사람들에게 감동을 줄 수 있다는 점이 정말 매력적입니다."\nQ: 앞으로의 계획이 있다면 무엇인가요?\nA:"앞으로는 종이공예 워크숍을 통해 더 많은 분들과 소통하고, 종이의 아름다움과 창의성을 나누고 싶습니다. 아이들과 성인 모두가 즐길 수 있는 프로그램을 마련하여, 종이공예의 즐거움을 함께 느끼고 싶어요."`,
                '/ex1-2.jpeg',
                '가죽마을은 2020년에 설립된 가죽공예 전문 공방으로,전통적인 가죽공예 기법과 현대적인 디자인을 조화롭게 결합한 독창적인 작품을 선보이고 있습니다.\n 핸드백, 지갑, 벨트 등 다양한 제품을 최고 품질의 가죽으로 제작하며, 고객의 요청에 따라 맞춤형 디자인도 제공합니다.'
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
                `Q: 시작하게 된 계기는 무엇인가요?\nA: "어릴 때부터 자연을 사랑해왔고, 특히 식물성 재료로 만드는 것에 매력을 느꼈어요. 라탄은 그 자체로도 아름답고, 다양한 디자인이 가능해서 매료되었습니다. 그래서 이를 전문적으로 배우고 작업하게 되었습니다."\nQ: 작품 제작 시 가장 중요하게 생각하는 것은 무엇인가요?\nA: "저는 항상 사용자의 편안함과 실용성을 고려합니다. 아름다움도 중요하지만, 최종 제품이 실제로 어떻게 사용될지를 생각하며 디자인하는 것이 가장 중요합니다. 그래서 고객의 피드백을 반영해 더 나은 작품을 만들려고 노력하고 있습니다."\nQ: 매력은 무엇인가요?\nA: "라탄 아트는 자연을 가까이 할 수 있는 좋은 방법이라고 생각합니다. 사람들이 제 작품을 통해 자연의 따뜻함과 편안함을 느끼길 바라요. 그리고 라탄 제품이 집 안의 아늑한 분위기를 더해주길 희망합니다."\nQ: 앞으로의 계획이 있다면 무엇인가요?\nA: "앞으로 라탄 아트의 다양성을 보여줄 수 있는 전시회를 계획하고 있습니다. 또한, 다양한 연령층을 대상으로 하는 워크숍을 통해 라탄 아트의 매력을 알리고, 더 많은 사람들이 직접 체험할 수 있는 기회를 만들고 싶습니다."`,
                '/ex1-3.jpg',
                `

                라탄 아틀리에는 2022년에 설립된 라탄 아트 전문 공방입니다.\n 자연 소재인 라탄을 활용하여 독창적인 가구와 소품을 제작하고 있습니다.\n  편안함과 스타일을 모두 갖춘 다양한 제품을 만나볼 수 있으며, 고객 맞춤형 디자인도 제공합니다.`
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
          <h2 className="text-left  text-3xl font-semibold mb-6 w-[900px]">
            화제의 공방
          </h2>
        </div>
        <div className="flex justify-center items-center space-x-4 gap-5">
          <div
            className="w-64 h-40 rounded-lg overflow-hidden cursor-pointer shadow-2xl"
            onClick={() =>
              openModal(
                '나만의 라탄 리스 만들기',
                `클래스 목표 및 기대효과\n목표 : 라탄 공예의 기초를 배우고, 자신만의 리스를 완성하는 것입니다.\n기대효과 : 수강 후, 기본적인 라탄 공예 기술을 습득하고, 창의력을 발휘하여 개인 맞춤형 작품을 제작할 수 있습니다.\n난이도 및 소요 시간\n- 난이도 : 초급\n- 소요 시간 : 2시간 재료 키트 정보\n- 키트 내용 : 자연 라탄, 디자인 가이드, 필수 공구 (가위, 테이프 등)\n수강료 할인 정보 (사전 예약 시 20% 할인)\n- 정상가 : 50,000원\n- 할인가 : 40,000원 (사전 예약 시 20% 할인)`,
                '/trend1.jpg',
                '이 워크숍에서는 라탄 공예의 기본적인 기법을 배우는 것을 시작으로, 각자의 개성과 스타일을 반영한 독창적인 리스를 만들어보는 시간을 제공합니다. \n 참여자는 라탄의 특성과 다루는 방법을 익히며, 자연 친화적인 소재를 활용해 실용적이고 아름다운 작품을 완성할 수 있습니다. '
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
                `클래스 목표 및 기대효과\n목표 : 목공의 기본을 배우고, 자신만의 스타일로 나무 소품을 완성하는 것입니다.\n기대효과 : 수업을 통해 각자만의 독창적인 디자인을 탐구하며, 나무를 통해 자신을 표현하는 방법을 배웁니다.\n난이도 및 소요 시간\n- 난이도 : 초급\n- 소요 시간 : 3시간\n재료 키트 정보\n- 키트 내용 : 원목 패널, 디자인 가이드, 필수 공구 (톱, 사포, 본드 등)수강료 할인 정보\n 수강료 할인 정보 (사전 예약 시 20% 할인)\n
                - 정상가 : 70,000원\n- 할인가 : 56,000원 \n`,
                '/trend2.jpg',
                '이 워크숍에서는 나무가 가진 따뜻함과 자연스러운 질감을 느끼며, 각자의 개성을 담은 소품을 직접 만들어보는 시간을 가집니다. \n 나무 소재의 특성과 다루는 방법을 배우는 것부터 시작해, 창의적인 디자인 과정을 통해 실용적이고 아름다운 작품을 완성할 수 있습니다.'
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
                `클래스 목표 및 기대효과\n목표 : 캔들 제작의 기본을 배우고, 자신만의 스타일로 독창적인 캔들을 완성하는 것입니다.\n기대효과 : 다양한 재료와 향을 조합하여 나만의 개성이 담긴 캔들을 제작하며, 창의성을 마음껏 표현할 수 있는 기회를 제공합니다.\n여러분의 창의력이 담긴 캔들을 만들어보는 이 워크숍에서는, 자연의 향기와 따뜻한 색감을 통해 아늑한 분위기를 연출할 수 있는 방법을 배워요.\n전문가의 도움으로 초보자도 쉽게 따라 할 수 있는 캔들 제작 기법을 배우며, 소중한 사람들과 나누고 싶은 특별한 작품을 완성해보세요\n난이도 및 소요 시간\n- 난이도: 초급\n- 소요 시간: 2시간재료 키트 정보\n- 키트 내용 : 다양한 색상의 왁스, 향료, 캔들 용기 및 심지, 디자인 가이드\n수강료 할인 정보 (사전 예약 시 20% 할인)\n- 정상가 : 70,000원\n- 할인가 : 56,000원 `,
                '/trend3.jpg',
                '이 워크숍에서는 초보자도 쉽게 따라 할 수 있는 캔들 제작 기법을 배우며, 다양한 재료와 향을 활용해 자신만의 독창적인 캔들을 완성해보는 시간을 제공합니다. \n 참여자는 캔들의 기본 구조와 제작 과정에 대해 이해하고, 창의성을 발휘해 특별한 디자인과 향기를 더할 수 있습니다. '
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
            {/* Hot Talk: 좋아요 순으로 Top 10 */}
            <div className="mb-10 min-h-[300px]">
              <h3 className="text-xl font-bold mb-4">주간 Top 10</h3>
              <div className="grid grid-cols-2 gap-4">
                {topTenPosts.length > 0 ? (
                  topTenPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md cursor-pointer"
                      onClick={() => navigate(`/communitydetail/${post.id}`)}
                    >
                      {/* 제목과 좋아요 */}
                      <div className="flex items-center w-1/2 space-x-2">
                        <span
                          className="text-gray-600 truncate"
                          style={{
                            maxWidth: '120px',
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          title={post.title} // 제목 전체 보여주기
                        >
                          {post.title}
                        </span>
                        <span className="flex items-center text-pink-700 text-sm space-x-1">
                          <span>{post.like_count}</span>
                          <TbThumbUp />
                        </span>
                      </div>
                      {/* 작성자 */}
                      <span
                        className="text-gray-500 truncate text-right"
                        style={{
                          maxWidth: '100px',
                          display: 'inline-block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={post.author?.nickname || '작성자'}
                      >
                        {post.author?.nickname || '작성자'}
                      </span>
                    </div>
                  ))
                ) : (
                  <div>데이터가 없습니다.</div>
                )}
              </div>
            </div>

            {/* 카테고리별 최신순으로 5개 */}
            <div className="grid grid-cols-3 gap-6 mt-20 min-h-8">
              {categories.map((category) => (
                <div key={category.id} className="min-h-[200px]">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">{category.label}</h4>
                    <button
                      onClick={() =>
                        navigate(`/community?category=${category.id}`)
                      }
                      className="text-gray-400 text-sm"
                    >
                      더보기 &gt;
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {posts[category.id]?.length > 0 ? (
                      posts[category.id].slice(0, 3).map((post) => (
                        <li
                          key={post.id}
                          className="flex justify-between bg-white p-2 rounded-lg shadow-md cursor-pointer"
                          onClick={() =>
                            navigate(`/communitydetail/${post.id}`)
                          }
                        >
                          <span className="text-gray-700 truncate">
                            {post.title}
                          </span>
                          <span className="text-orange-500 text-sm">
                            [{post.comment_count}]
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">게시물이 없습니다.</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modalState.isOpen && (
        <Modal
          title={modalState.title}
          content={modalState.content}
          imageSrc={modalState.image}
          info={modalState.info}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Main;
