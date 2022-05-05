import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function RouteLinks(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  return user ? (
    <Redirect to="/dashboard" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
}
