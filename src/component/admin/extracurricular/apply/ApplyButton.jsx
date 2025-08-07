
const ApplyButton = () => {
    return(
    <div className="mt-3 flex gap-3 justify-center w-full">
      <button
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        저장
      </button>

      <button
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        취소
      </button>
    </div>
    )
}

export default ApplyButton;