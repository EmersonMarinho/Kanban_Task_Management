/* eslint-disable react/prop-types */
function AddEditBoardModal({ setBoardModalOpen }) {
  return (
    <div 
    onClick={(e) => {
        if(e.target !== e.currentTarget) {
            return 
        }
        setBoardModalOpen(false);
    }}
    className="fixed right-0 left-0 top-0 bottom-0 scrollbar-hide px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]">
        <div className=" scrollbar-hide overflow-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
            
        </div>
        
    </div>
  )
}

export default AddEditBoardModal