import { createContext, useState } from 'react';
import data from '../data/data.json';
import PropTypes from 'prop-types';

const BoardsContext = createContext();

function BoardsProvider({ children }) {
    const [boards, setBoards] = useState(data.boards);

    const addBoard = (name, newColumns) => {
        const isActive = boards.length === 0 ? false : true;
        const board = {
            name,
            isActive,
            columns: newColumns,
        }
        setBoards([...boards, board]);
    }

    const editBoard = (name, newColumns) => {
        const updatedBoards = boards.map(board => {
            board.isActive ? { ...board, name, columns: newColumns } : board;
    })
    setBoards(updatedBoards);
}

    const deleteBoard = () => {
        const updatedBoards = boards.filter(board => !board.isActive);
        setBoards(updatedBoards);
    }

    return (
        <BoardsContext.Provider value={{boards, addBoard, editBoard, deleteBoard}}>
            {children}
        </BoardsContext.Provider>
    )
}

BoardsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { BoardsContext, BoardsProvider };
