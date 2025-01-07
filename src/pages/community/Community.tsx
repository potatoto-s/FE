import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';

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
  // const [visibleCount, setVisibleCount] = useState<number>(10); // 한 번에 표시할 게시글 수
  const [lists, setLists] = useState<Post[]>([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const { user } = useUserStore();
  console.log(user?.role);

  // 검색어에 따라 게시글 필터링
  // const filteredPosts = lists.filter((post) =>
  //   post.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // 현재 표시할 게시글
  // const visiblePosts = filteredPosts.slice(0, visibleCount);

  // more 버튼 클릭 핸들러
  // const handleMoreClick = () => {
  //   setVisibleCount((prevCount) => prevCount + 10); // 10개씩 더 보기
  // };

  useEffect(() => {
    const fetchPostList = async () => {
      const res = await axiosInstance.get('/api/posts/');
      console.log(res.data.data);
      setLists(res.data.data);
    };

    fetchPostList();
  }, []);

  console.log(lists);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#FFFBEF]">
      <div className="w-[81.25rem] px-4 mt-[6.25rem]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[#F28749] text-2xl font-bold">커뮤니티</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-4 py-2 w-[20rem] focus:outline-none focus:ring-2 focus:ring-[#F28749]"
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
          {
            lists.length > 0 &&
              lists.map((post, index) => (
                <Link
                  to={`/communitydetail/${post.id}`}
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
                    <span className="mr-4">{post.author.nickname}</span>
                    <span className="mr-4">{post.created_at}</span>
                    <span>{post.view_count} 조회</span>
                  </div>
                </Link>
              ))
            // ) : (
            //   // <div className="text-center text-gray-500 py-4">
            //   //   검색 결과가 없습니다.
            //   // </div>
            // )
          }
        </div>
        {/* 
        {visiblePosts.length < filteredPosts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleMoreClick}
              className="text-[#F28749] font-bold border border-[#F28749] rounded-lg px-6 py-2 hover:bg-[#F28749] hover:text-white transition duration-300"
            >
              more
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Community;
