/* eslint-disable react/prop-types */
import { useContext } from 'react'
import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import { Switch } from "@headlessui/react"
import useDarkMode from "../Hooks/useDarkMode"
import PropTypes from 'prop-types';
import { useState } from "react"
import { BoardsContext } from "../context/BoardsContext"


function HeaderDropDown({ setOpenDropDown, setBoardModalOpen }) {
    const [colorTheme, setTheme] = useDarkMode()
    const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false)

    const toggleTheme = (checked) => {
        setDarkSide(checked)
        setTheme(colorTheme)
    }


    const boards = useContext(BoardsContext).boards;

    console.log('boards =', boards);


  return (
    <div className=" py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]" onClick={
        (e) => {
            if(e.target !== e.currentTarget) {
                return 
            }
            setOpenDropDown(false)
        }
    }>
        <div className='bg-white dark:bg-[#2b2c37] shadow-sm shadow-[#364e7ec] w-full py-4 rounded-xl'>
            <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                All boards ({boards.length})
            </h3>

            <div>
                {boards.map((board, index) => (
                    <div key={index} 
                    className={`flex items-baseline  dark:text-white space-x-2 px-5 py-4 
                    ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`}>
                        <img src={boardIcon} alt="boardIcon" className=" h-4" />
                        <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                ))}

                <div className=" cursor-pointer flex items-baseline space-x-2 text-[#635fc7] px-5 py-4" 
                    onClick={() => {
                        setBoardModalOpen(true) 
                        setOpenDropDown(false);}
                    }>
                    <img src={boardIcon} alt="createTask" className="h-4"/>
                    <p className="text-lg font-bold">
                        Create new board
                    </p>
                </div>
                    <div className=" mx-2 p-4 space-x-2 bg-slate-100 dark:bg=[#20212c] flex justify-center items-center rounded-lg">
                        <img src={lightIcon} />

                        <Switch 
                        checked={darkSide}
                        onChange={toggleTheme}
                        className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                            <span className={`${darkSide ? 'translate-x-6': 'translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition duration-200'}`}/>
                        </Switch>

                        <img src={darkIcon} />
                    </div> 
            </div>
        </div>
    </div>
  )
}

HeaderDropDown.propTypes = {
    setOpenDropDown: PropTypes.func.isRequired,
}

export default HeaderDropDown