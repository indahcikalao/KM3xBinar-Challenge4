import React from 'react';
import axios from 'axios';
import {
  BsFillPencilFill,
  BsCheckSquareFill,
  BsTrashFill,
} from 'react-icons/bs';

const TodoList = ({ navigate, filtered, setRefetchData }) => {
  function handleDelete(id) {
    axios
      .delete(`https://fake-api-coba.herokuapp.com/todos/${id}`)
      .then((response) => {
        console.log(response);
        setRefetchData(true);
      });
  }

  function markCompleted(comp, id) {
    axios
      .patch(`https://fake-api-coba.herokuapp.com/todos/${id}`, {
        complete: !comp,
      })
      .then((response) => console.log(response.data.complete));
  }

  return filtered.map((item, index) => (
    <React.Fragment key={item.id}>
      <div className="mainBg" id={item.complete ? 'comp' : ''}>
        <div className={item.complete ? 'done' : ''}>
          <span className="taskIndex">{index + 1} . </span>
          <span className="taskText">{item.task} </span>
        </div>
        <div className="icons">
          {!item.complete && (
            <span title="Edit" className="icons-item">
              <BsFillPencilFill
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/second/${item.id}`);
                }}
              />
            </span>
          )}
          <span title="Complete" className="icons-item">
            <BsCheckSquareFill
              onClick={(e) => {
                e.preventDefault();
                markCompleted(item.complete, item.id);
              }}
            />
          </span>

          <span title="Delete" className="icons-item">
            <BsTrashFill onClick={() => handleDelete(item.id)} />
          </span>
        </div>
      </div>
    </React.Fragment>
  ));
};

export default TodoList;
