/* eslint-disable react/prop-types */
// External Libraries
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Local Modules
import data from '../data/data.json';

export const BoardsContext = React.createContext();

const boardsWithIDs = data.boards.map(board => ({
  ...board,
  id: uuidv4(),
}));

export const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState(boardsWithIDs);

  // Board Functions
  const addBoard = (name, newColumns) => {
    const isActive = boards.length === 0 ? false : true;
    const board = {
      id: uuidv4(),
      name,
      isActive,
      columns: newColumns,
    };
    console.log("New Board", board);
    setBoards([...boards, board]);
  };

  const editBoard = (updatedBoard) => {
    console.log('Editing Board', boards.id, updatedBoard);
    setBoards((prevBoards) =>
        prevBoards.map((board) =>
            board.id === updatedBoard.id ? updatedBoard : board
        )
    );
};

  const deleteBoard = () => {
    const updatedBoards = boards.filter((board) => !board.isActive);
    setBoards(updatedBoards);
  };

  const setBoardActive = (index) => {
    const updatedBoards = boards.map((board, i) => {
      return i === index ? { ...board, isActive: true } : { ...board, isActive: false };
    });
    setBoards(updatedBoards);
  };

  // Task Functions
  const addTask = (title, description, subtasks, status, newColIndex) => {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      subtasks,
      status,
    };
    const newBoards = [...boards];
    const activeBoard = newBoards.find((board) => board.isActive);
    const selectedColumn = activeBoard.columns[newColIndex];

    if (!selectedColumn.tasks) {
      selectedColumn.tasks = [];
    }

    selectedColumn.tasks.push(newTask);
    setBoards(newBoards);
  };

  const editTask = (title, description, subtasks, status, taskIndex, prevColIndex, newColIndex) => {
    const updatedBoards = boards.map((board) => {
      if (board.isActive) {
        const updatedColumns = board.columns.map((col, i) => {
          if (i === prevColIndex) {
            const updatedTasks = col.tasks.map((task, j) => {
              if (j === taskIndex) {
                return { title, description, subtasks, status };
              } else {
                return task;
              }
            });
            return { ...col, tasks: updatedTasks };
          } else if (i === newColIndex && prevColIndex !== newColIndex) {
            const task = { title, description, subtasks, status };
            const updatedTasks = [...col.tasks, task];
            return { ...col, tasks: updatedTasks };
          } else {
            return col;
          }
        });
        return { ...board, columns: updatedColumns };
      } else {
        return board;
      }
    });
    setBoards(updatedBoards);
  };

  const setTaskStatus = (colIndex, taskIndex, newColIndex, status) => {
    const updatedBoards = boards.map((board) => {
      if (board.isActive) {
        const updatedColumns = board.columns.map((col, i) => {
          if (i === colIndex) {
            const updatedTasks = col.tasks.filter((task, j) => j !== taskIndex);
            return { ...col, tasks: updatedTasks };
          } else if (i === newColIndex) {
            const task = board.columns[colIndex].tasks[taskIndex];
            const updatedTasks = [...col.tasks, { ...task, status }];
            return { ...col, tasks: updatedTasks };
          } else {
            return col;
          }
        });
        return { ...board, columns: updatedColumns };
      } else {
        return board;
      }
    });
    setBoards(updatedBoards);
  };

  const deleteTask = (colIndex, taskIndex) => {
    const updatedBoards = boards.map((board) => {
      if (board.isActive) {
        const updatedColumns = board.columns.map((col, i) => {
          if (i === colIndex) {
            const updatedTasks = col.tasks.filter((task, j) => j !== taskIndex);
            return { ...col, tasks: updatedTasks };
          } else {
            return col;
          }
        });
        return { ...board, columns: updatedColumns };
      } else {
        return board;
      }
    });
    setBoards(updatedBoards);
  };

  // Subtask Functions
  const setSubtaskCompleted = (colIndex, taskIndex, index) => {
    const updatedBoards = boards.map((board) => {
      if (board.isActive) {
        const updatedColumns = board.columns.map((col, i) => {
          if (i === colIndex) {
            const updatedTasks = col.tasks.map((task, j) => {
              if (j === taskIndex) {
                const updatedSubtasks = task.subtasks.map((subtask, k) => {
                  if (k === index) {
                    return { ...subtask, isCompleted: !subtask.isCompleted };
                  } else {
                    return subtask;
                  }
                });
                return { ...task, subtasks: updatedSubtasks };
              } else {
                return task;
              }
            });
            return { ...col, tasks: updatedTasks };
          } else {
            return col;
          }
        });
        return { ...board, columns: updatedColumns };
      } else {
        return board;
      }
    });
    setBoards(updatedBoards);
  };

  console.log(boards);

  return (
    <BoardsContext.Provider
      value={{
        boards,
        setBoards,
        addBoard,
        editBoard,
        deleteBoard,
        setBoardActive,
        addTask,
        editTask,
        setTaskStatus,
        deleteTask,
        setSubtaskCompleted,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};
