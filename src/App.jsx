import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import SignUpForm from "./components/SignUpForm";
import ExportButton from "./components/ExportButton";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const addUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <SignUpForm addUser={addUser} />
      <UserTable users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
