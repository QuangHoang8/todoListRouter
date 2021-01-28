import React, { useState } from "react";
import classes from "./Header.module.css";
import { addTodo } from "../services/todoService";
// import { connect } from "react-redux";
// import { addName } from "../redux/actionCreators";

function Header({ onTodoAdded, nameLogin }) {
  const [currentItem, setCurrentItem] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const handleChange = (value) => {
    setCurrentItem(value);
  };

  const handeKeyDown = async (event) => {
    if (event.keyCode === 13 && currentItem) {
      try {
        setIsAdding(true);
        await addTodo(currentItem);
        onTodoAdded();
      } catch {
      } finally {
        setIsAdding(false);
      }

      setCurrentItem("");
    }
  };

  return (
    <header className={classes.heading}>
      <h1>Tasks</h1>
      <h1>Xin chào {nameLogin}</h1>
      <input
        type="text"
        disabled={isAdding}
        value={currentItem}
        placeholder="Add a task"
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(event) => handeKeyDown(event)}
      />
    </header>
  );
}

export default Header;
