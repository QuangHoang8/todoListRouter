import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
export default function ToDoDetail() {
  let { slug } = useParams();

  return <div> TodoDetail{slug}</div>;
}
