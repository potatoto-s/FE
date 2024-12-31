import React, { useState } from 'react';

type Post = {
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
};

// 더미 데이터 생성 함수
const generateDummyPosts = (count: number): Post[] => {
  const categories = [
    '레진/비즈공예',
    '목공/도자기/가죽',
    '플라워',
    '디퓨저/캔들/석고방향제',
    '라탄/마크라메',
  ];
  const authors = ['author1', 'author2', 'author3', 'author4', 'author5'];
  const titles = [
    '비즈의 종류는 무엇이 있나요?',
    '가죽 공예의 기초',
    '플라워 데코레이션 팁',
    '캔들 제작을 위한 팁',
    '마크라메 기초 배우기',
  ];

  const dummyPosts: Post[] = [];
  for (let i = 0; i < count; i++) {
    dummyPosts.push({
      category: categories[i % categories.length],
      title: titles[i % titles.length],
      author: authors[i % authors.length],
      date: `2024.12.${16 - (i % 10)}`,
      views: Math.floor(Math.random() * 1000),
    });
  }
  return dummyPosts;
};

const allPosts: Post[] = generateDummyPosts(50); // 50개의 더미 데이터 생성

const Community: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [visibleCount, setVisibleCount] = useState<number>(10); // 한 번에 표시할 게시글 수

  // 검색어에 따라 게시글 필터링
  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 현재 표시할 게시글
  const visiblePosts = filteredPosts.slice(0, visibleCount);

  // more 버튼 클릭 핸들러
  const handleMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + 10); // 10개씩 더 보기
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFFBEF]">
      <div className="w-[81.25rem] px-4 mt-[6.25rem]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#F28749] text-2xl font-bold">커뮤니티</h1>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-[20rem] focus:outline-none focus:ring-2 focus:ring-[#F28749]"
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-b-0 py-4 text-[#0F0F0F]"
              >
                <div className="flex items-center">
                  <span className="text-[#F28749] font-medium mr-4">
                    [{post.category}]
                  </span>
                  <span className="text-lg font-bold">{post.title}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-4">{post.author}</span>
                  <span className="mr-4">{post.date}</span>
                  <span>{post.views} 조회</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              검색 결과가 없습니다.
            </div>
          )}
        </div>

        {visiblePosts.length < filteredPosts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleMoreClick}
              className="text-[#F28749] font-bold border border-[#F28749] rounded-lg px-6 py-2 hover:bg-[#F28749] hover:text-white transition duration-300"
            >
              more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
