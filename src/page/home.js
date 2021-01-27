import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import _ from "lodash";
import CompleteTask from "../components/CompleteTask";
import Header from "../components/Header";
import TaskList from "../components/TaskList";
import {
  getToDos,
  changeTaskCompletedState,
  changeTaskFavoriteState,
} from "../services/todoService";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Form } from "antd";
import "./home.css";
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
function Home() {
  const [taskLists, setTaskLists] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [loadingCount, setLoadingCount] = useState(true);
  const convertDate = (time) => new Date(time).getTime();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getToDos();
        setTaskLists(
          response.map((task) => {
            return {
              ...task,
              createdDate: convertDate(task.createdDate),
              completedDate: convertDate(task.completedDate),
            };
          })
        );
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [loadingCount]);
  const handleToDoAdded = () => {
    setIsLoading(true);
    setIsError(false);
    setLoadingCount(loadingCount + 1);
  };
  const renderContent = () => {
    return isLoading ? (
      "Loading..."
    ) : (
      <>
        <Header onTodoAdded={handleToDoAdded} />
        <TaskList
          incompleteItems={inCompletedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <CompleteTask
          completedItems={completedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        ;
      </>
    );
  };

  const renderButton = () => {
    return (
      <div>
        <button
          onClick={() => {
            setIsError(false);
            setIsLoading(true);
          }}
        >
          Tải lại
        </button>
      </div>
    );
  };

  const handleChangeCompleteStatus = async (taskId, newStatus) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await changeTaskCompletedState(taskId, newStatus);
      setLoadingCount(loadingCount + 1);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      setIsError(false);
      setIsLoading(true);
      await changeTaskFavoriteState(taskId, newStatus);
      setLoadingCount(loadingCount + 1);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [completedList, inCompletedList] = _.partition(
    taskLists,
    (t) => t.isCompleted
  );

  return (
    <div className="App">
      {isError ? renderButton() : renderContent()}
      <div className="flex">
        <Link to="/">
          <Form.Item {...tailLayout}>
            <button type="button">Home</button>
          </Form.Item>
        </Link>
        <Link to="/profile">
          <Form.Item {...tailLayout}>
            <button type="button">Profile</button>
          </Form.Item>
        </Link>
      </div>
    </div>
  );
}

export default Home;
