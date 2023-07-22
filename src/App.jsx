import { useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/users/usersSlice";

function App() {
  const { isLoading, error, users } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>is loading...</div>;
  }
  if (error) {
    return <div>there is an error</div>;
  }

  return (
    <>
      <ul>
        {users.map(user => (
          <li
            key={user.id.value}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
              <span>{user.name.title},</span>
              <span>{user.name.first}</span>
              <span>{user.name.last}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
