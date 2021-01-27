import "antd/dist/antd.css";
import { Form } from "antd";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
export const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>

      <Link to="/">
        <Form.Item {...tailLayout}>
          <button type="button">Logout</button>
        </Form.Item>
      </Link>
      <Link to="/todo">
        <Form.Item {...tailLayout}>
          <button type="button">TodoApp</button>
        </Form.Item>
      </Link>
    </div>
  );
};
