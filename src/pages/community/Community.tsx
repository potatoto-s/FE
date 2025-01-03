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
    '목공 작업의 안전 수칙',
    '도자기 굽기 전 주의사항',
    '선물 포장 아이디어 10가지',
    '핸드메이드 디퓨저 만들기',
    '캔들 향 선택 방법',
    '비즈 공예를 위한 도구 소개',
    '라탄 가구 제작 과정',
    '마크라메 벽 장식 만들기',
    '초보자를 위한 플라워 디자인',
    '석고 방향제의 장단점',
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

const allPosts: Post[] = generateDummyPosts(100); // 100개의 더미 데이터 생성

const Community: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [currentPageGroup, setCurrentPageGroup] = useState<number>(0); // 현재 페이지 그룹
  const postsPerPage = 10; // 페이지당 표시할 게시글 수
  const pagesPerGroup = 5; // 한 번에 표시할 페이지 수

  // 검색어에 따라 게시글 필터링
  const filteredPosts = allPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });

  // 현재 페이지에 표시할 게시글
  const startIndex = (currentPage - 1) * postsPerPage;
  const visiblePosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 현재 페이지 그룹에 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const startPage = currentPageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // 페이지 이동 핸들러
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 다음 그룹 핸들러
  const handleNextGroup = () => {
    if ((currentPageGroup + 1) * pagesPerGroup < totalPages) {
      setCurrentPageGroup((prev) => prev + 1);
    }
  };

  // 이전 그룹 핸들러
  const handlePrevGroup = () => {
    if (currentPageGroup > 0) {
      setCurrentPageGroup((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* 검색 및 게시글 섹션 */}
      <div className="w-full max-w-5xl px-4 mt-4 md:mt-6">
        {/* 검색 필드 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-[#F28749] text-lg md:text-2xl font-bold mb-2 md:mb-0">
            커뮤니티
          </h1>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[20rem] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F28749]"
          />
        </div>

        {/* 게시글 리스트 */}
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
                  <span className="text-sm md:text-base font-bold">
                    {post.title}
                  </span>
                </div>
                <div className="flex items-center text-xs md:text-sm text-gray-500">
                  <span className="mr-2">{post.author}</span>
                  <span className="mr-2">{post.date}</span>
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

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4 gap-2">
          {currentPageGroup > 0 && (
            <span
              onClick={handlePrevGroup}
              className="cursor-pointer text-sm md:text-base text-gray-500 hover:text-[#F28749]"
            >
              이전
            </span>
          )}
          {getPageNumbers().map((page) => (
            <span
              key={page}
              onClick={() => handlePageClick(page)}
              className={`cursor-pointer px-2 text-sm md:text-base ${
                currentPage === page
                  ? 'text-[#F28749] font-bold underline'
                  : 'text-gray-500 hover:text-[#F28749]'
              }`}
            >
              {page}
            </span>
          ))}
          {(currentPageGroup + 1) * pagesPerGroup < totalPages && (
            <span
              onClick={handleNextGroup}
              className="cursor-pointer text-sm md:text-base text-gray-500 hover:text-[#F28749]"
            >
              더보기
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
