import React, { useState, useEffect } from "react";
import Welcome from "./Welcome";
import "./App.css";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [welcome, setWelcome] = useState(true);
  const [alert, setAlert] = useState({ show: true, msg: "", type: "" });
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //alert
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      // eslint-disable-next-line array-callback-return
      list.find((item) => {
        if (item.title === name) {
          showAlert(true, `value "${name}" already in list"`, "danger");
          setList(list.filter((item) => item.title !== name.lastIndexOf(name)));
        }
      });
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");
    } else {
      //show alet
      showAlert(true, "item added to the list", "success");

      //add to list
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      // eslint-disable-next-line array-callback-return
      list.find((item) => {
        if (item.title === name) {
          showAlert(true, `value "${name}" already in list`, "danger");
          setList(list.filter((item) => item.title !== name.lastIndexOf(name)));
        }
      });
      setName("");
    }
  };
  const removeItem = (id) =>
    setList(
      list.filter((item) => item.id !== id),
      showAlert(true, "item deleted", "danger")
    );
  const editItem = (id) => {
    const specificName = list.find((item) => item.id === id);
    setEditID(id);
    setName(specificName.title);
    setIsEditing(true);
  };
  const clearAll = () => {
    showAlert(true, "list cleared", "danger");
    setList([]);
    setName("");
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className={`App ${darkMode ? "dark_mode" : ".App"}`}>
      {welcome ? (
        <Welcome setWelcome={setWelcome}></Welcome>
      ) : (
        <article className="section-center">
          <div className={`toggle ${darkMode ? "toggle-dark" : "toggle"}`}>
            <i className="indicator" onClick={() => setDarkMode(!darkMode)}></i>
          </div>
          <h1>To-Do List</h1>
          <form onSubmit={handleSubmit}>
            {alert.show && (
              <Alert {...alert} list={list} removeAlert={showAlert} />
            )}
            <div className="form-control">
              <input
                type="text"
                placeholder="please enter items..."
                className="todo-text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "edit" : "submit"}
              </button>
            </div>
          </form>

          {list.length > 0 && (
            <div className="noi-clearAll-sec">
              <h4>Items : {list.length}</h4>
              <button type="button" className="clear-btn" onClick={clearAll}>
                Clear All
              </button>
            </div>
          )}

          {list.length > 0 && (
            <div className="todo-center">
              <List
                list={list}
                removeItem={removeItem}
                editItem={editItem}
                darkMode={darkMode}
              ></List>
            </div>
          )}
        </article>
      )}
    </div>
  );
}

export default App;
