
const CategoryButtons = () => {

    
    const selectButton = () => {
        alert("조회 버튼")
    }

    const insertButton =() => {
        alert("신규 버튼")
    }

    const updateButton = () => {
        alert("저장 버튼")
    }

    const deleteButton = () => {
        alert("삭제 버튼")
    }

    return(
        <div className="mt-5 flex gap-3 justify-end w-full">
            <button 
                onClick={selectButton}
                className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded">
                조회
            </button>

             <button 
                onClick={insertButton}
                className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded">
                신규
            </button>

             <button 
                onClick={updateButton}
                className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded">
                저장
            </button>

             <button 
                onClick={deleteButton}
                className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded">
                삭제
            </button>
        </div>
    )
}
export default CategoryButtons;