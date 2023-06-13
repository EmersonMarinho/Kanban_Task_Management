/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import data from '../data/data.json';
import { v4 as uuidv4 } from 'uuid';

export const BoardsContext = React.createContext();

export const BoardsProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);

  const addBoard = (name, newColumns) => {
    const isActive = boards.length === 0 ? false : true;
    const board = {
      name,
      isActive,
      columns: newColumns,
    };
    setBoards([...boards, board]);
  };

  const editBoard = (updatedBoard) => {
    const updatedBoards = boards.map((board) => {
      return board.id === updatedBoard.id ? updatedBoard : board;
    });
    setBoards(updatedBoards);
  };

  const deleteBoard = () => {
    const updatedBoards = boards.filter((board) => !board.isActive);
    setBoards(updatedBoards);
  };

  const setBoardActive = (index) => {
    const updatedBoards = boards.map((board, i) => {
      if (i === index) {
        return { ...board, isActive: true };
      } else {
        return { ...board, isActive: false };
      }
    });
    setBoards(updatedBoards);
  };

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

  console.log(boards);

  return (
    <BoardsContext.Provider
      value={{ boards, setBoards, addBoard, editBoard, deleteBoard, setBoardActive, setSubtaskCompleted, editTask,  setTaskStatus, deleteTask, addTask }}
    >
      {children}
    </BoardsContext.Provider>
  );
};