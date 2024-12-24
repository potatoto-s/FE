function ConfirmModal() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-500 mb-4">삭제 확인</h2>
          <p className="text-gray-700">정말로 게시글을 삭제하시겠습니까?</p>
          <p className="mb-4 text-gray-700">삭제 후에는 복구할 수 없습니다.</p>
          <p className="text-gray-500 text-sm mb-8">
            해당 글을 삭제하시면 포함된 댓글도 모두 삭제됩니다.
          </p>
          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="text-sm px-4 py-1 text-white bg-[#F28749] rounded hover:bg-[#d8743e] transition duration-300"
            >
              취소
            </button>
            <button
              type="reset"
              className="text-sm px-4 py-1 text-[#F28749] border border-[#F28749] rounded-md hover:bg-[#f28749] hover:text-white transition duration-300"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmModal;
