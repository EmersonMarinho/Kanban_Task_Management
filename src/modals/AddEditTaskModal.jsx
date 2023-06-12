import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";


function AddEditTaskModal({ type, device, setOpenAddEditTask}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [subtasks, setSubtasks] = useState([
        { title: '', isCompleted: false, id: uuidv4()},
        { title: '', isCompleted: false, id: uuidv4()},

    ]);

    const onDelete = (id) => {
        setSubtasks((prevState) => {
            const subtasks = prevState.filter((subtask) => subtask.id !== id);
            return subtasks;
        });
    }

    const onChangeTask = (id, newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState];
            const subTasks = newState.find((subtask) => subtask.id === id);
            subTasks.title = newValue;
            return newState;
        });
    }



  return (
    <div 
    onClick={(e) => {
        if(e.target !== e.currentTarget){
            return;
        } else {
            setOpenAddEditTask(false);
        }
    }}
    className={device === 'mobile' ? ' py-6 px-6 pb-40 absolute overflow-y-scroll scrollbar-hide left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]' : 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0  scrollbar-hide bottom-0 top-0 bg-[#00000080]'}>
        <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
            <h3 className=" text-lg">
                {type === 'edit' ? "Edit" : "Add New"} Task
            </h3>

            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-gray-500">
                    Task Name
                </label>
                <input 
                className=" bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
                onChange={(e) => setTitle(e.target.value) } 
                value={title} 
                type="text"
                placeholder="e.g Take coffee break" />
            </div>

            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-gray-500">
                    Description
                </label>
                <textarea 
                className=" bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 min-h-[200px] focus:outline-[#635fc7] ring-0"
                onChange={(e) => setDescription(e.target.value) } 
                value={description} 
                type="text"
                placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a little." />
            </div>


            <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-gray-500">
                    Subtasks
                </label>
            </div>

            { subtasks.map((subtask, index) => {
                console.log(subtask.title);
                return (
                    <div key={index} 
                        className=" flex items-center w-full"
                    >
                        <input 
                        onChange={(e) => {
                            onChangeTask(subtask.id, e.target.value)
                        }}
                        className='bg-transparent outline-none focus:border-0 border flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7]' 
                        type="text" 
                        value={subtask.title}
                        placeholder="e.g Take coffee break"
                        />
                    <img src={crossIcon} alt='delete-button' className="m-4 cursor-pointer" onClick={() => {
                        onDelete(subtask.id);
                    }}/>
 
                    </div>
                )
            })}




        </div>

    </div>
  )
}

export default AddEditTaskModal