import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import axiosInstance from '../../api/axiosInstance';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import useDebounce from '../../hooks/useDebounce';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type Post = {
  id: number;
  category: string;
  title: string;
  author: Author;
  created_at: string;
  view_count: number;
};

type Author = {
  id: number;
  nickname: string;
  workshop_name?: string;
  company_name?: string;
};

const Community: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [lists, setLists] = useState<Post[]>([]); // 게시글 리스트
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 상태
  const [hasNext, setHasNext] = useState<boolean>(false); // 다음 페이지 여부
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const [nextCursor, setNextCursor] = useState<number>(0); // 로딩 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { user } = useUserStore(); // 사용자 정보를 가져오는 커스텀 훅
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const debouncedSearchQuery = useDebounce(searchQuery, 1000); // 디바운스를 적용한 검색어
  // const postsPerPage = 10; // 한 페이지당 게시글 수

  // 게시글 리스트를 서버에서 가져오는 함수
  const fetchPostList = useCallback(
    async (next: number) => {
      setIsLoading(true); // 로딩 시작
      try {
        const res = await axiosInstance.get('/api/posts/', {
          params: {
            cursor: next || undefined, // 페이지 계산
            // limit: postsPerPage, // 한 페이지당 데이터 수
            category: category || undefined, // 카테고리 필터
            search: debouncedSearchQuery || undefined, // 검색어 필터
          },
        });
        console.log(nextCursor);
        setLists(res.data.data); // 리스트 설정
        setHasNext(res.data.has_next); // 다음 페이지 여부 설정
        setNextCursor(res.data.next_cursor);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    },
    [category, debouncedSearchQuery] // 의존성 추가
  );

  // 초기 데이터 로드 및 검색어, 카테고리 변경 시 데이터 로드
  useEffect(() => {
    fetchPostList(nextCursor);
  }, [category, debouncedSearchQuery, currentPage, fetchPostList]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // 페이지 변경 핸들러
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // 현재 페이지 변경
    setNextCursor(nextCursor);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fffcf5]">
      <div className="w-full max-w-[81.25rem] px-4 mt-[6.25rem]">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-[#F28749] text-xl md:text-2xl font-bold mb-4 md:mb-0">
            커뮤니티
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-[20rem] focus:outline-none focus:ring-2 focus:ring-[#F28749]"
            />
            {user?.role === 'WORKSHOP' && (
              <button
                className="bg-[#F28749] text-white px-4 py-2 rounded-lg focus:outline-none"
                onClick={() => navigate('/communitypost')} // /communitypost로 이동
              >
                글쓰기
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          {isLoading ? (
            <div className="text-center text-gray-500 py-4">로딩 중...</div>
          ) : lists.length > 0 ? (
            lists.map((post, index) => (
              <Link
                to={`/communitydetail/${post.id}`}
                key={index}
                className="flex flex-col md:flex-row items-center justify-between border-b last:border-b-0 py-4 text-[#0F0F0F]"
              >
                <div className="flex items-center">
                  <span className="text-[#F28749] font-medium mr-3">
                    [{post.category}]
                  </span>
                  <span className="font-semibold">{post.title}</span>
                </div>
                <div className="flex flex-col md:flex-row items-center text-sm text-gray-500">
                  <span className="mr-0 md:mr-4">{post.author.nickname}</span>
                  <span>
                    {dayjs(post.created_at).format('YYYY. MM. DD. HH:mm')}{' '}
                    {/* dayjs 포맷팅 */}
                  </span>
                  <span>{post.view_count} 조회</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              검색 결과가 없습니다.
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(50 / 10)} // 전체 페이지 수 계산
            page={currentPage} // 현재 페이지
            onChange={handlePageChange} // 페이지 변경 핸들러
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
                disabled={item.type === 'next' && !hasNext} // 다음 버튼 비활성화 조건 추가
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Community;
