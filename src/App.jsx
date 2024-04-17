import "./App.css";
import IncreaseNumber from "./components/numbers/IncreaseNumber";
import DecreaseNumber from "./components/numbers/DecreaseNumber";
import ResetNumber from "./components/numbers/ResetNumber";
import { useSelector } from "react-redux";
import AddName from "./components/users/AddName";
import AddNumber from "./components/users/AddNumber";
import AddUserList from "./components/users/AddUserList";
import Display from "./components/numbers/Display";
function App() {

  const user = useSelector((state) => {
    return state.user;
  });

  return (
    <>
      <h1>Practise practise</h1>
      <h3>
        this is the demo for increase number and decrease number using redux
        toolkit
      </h3>
      <IncreaseNumber />
      <Display/>
      <DecreaseNumber />
      <hr />
      <ResetNumber />

      <hr />
      <h3>display name and phone</h3>
      {/* <p>{user.name}</p>
      <p>{user.number}</p> */}

      {user.userList.map((list) => {
        return <li>{list.id}</li>;
      })}
      <AddUserList />
      <AddName />
      <AddNumber />
    </>
  );
}

export default App;
