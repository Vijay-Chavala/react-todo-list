import React from "react";
import "./App.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
const List = ({ list, removeItem, editItem, darkMode }) => {
  return (
    <article
      className={`"todo-list" ${darkMode ? "dark_mode_list" : "todo-list"}`}
    >
      {list.map((item) => {
        const { id, title } = item;
        return (
          <main key={id} className="list-container">
            <div className="content">
              <p>{title}</p>
              <div className="btn-container">
                <button onClick={() => editItem(id)}>
                  <FiEdit2 />
                </button>
                <button onClick={() => removeItem(id)}>
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </main>
        );
      })}
    </article>
  );
};

export default List;
