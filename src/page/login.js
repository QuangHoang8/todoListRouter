import React, { useState } from "react";
import "antd/dist/antd.css";
import classes from "./login.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addName } from "../redux/actionCreators";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const users = [
  { name: "admin", email: "admin@gmail.com", password: "123" },
  { name: "Hoang", email: "hoang@gmail.com", password: "456" },
  { name: "Minh", email: "minh@gmail.com", password: "789" },
];
export const Login = ({ addName }) => {
  let history = useHistory();
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [warn, setWarn] = useState("");

  const handleChangeUser = (value) => {
    setUser(value);
  };
  const handleChangePassword = (value) => {
    setPassword(value);
  };
  const checkUser = (emailLogin, passwordLogin) => {
    const userLogin = users.filter(
      (user) => user.email === emailLogin && user.password === passwordLogin
    );
    if (userLogin.length === 0) {
      return false;
    } else {
      addName(userLogin[0].name);
      console.log(userLogin[0].name);
      return true;
    }
  };
  function handleLogin() {
    if (checkUser(user, password)) {
      history.push("/todo");
    } else {
      setWarn("Bạn đã nhập sai mật khẩu");
    }
  }
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.container}>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className={classes.font_color}>{warn}</div>
        <Form.Item
          label="Email"
          name="username"
          value={user}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
          onChange={(e) => handleChangeUser(e.target.value)}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={password}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          onChange={(e) => handleChangePassword(e.target.value)}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <button type="button" onClick={() => handleLogin()}>
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state.addName);
  return {
    name: state.addName.name,
  };
};
const mapDispatchToProps = { addName };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
