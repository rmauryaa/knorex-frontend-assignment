import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import SearchIt from "./components/SearchIt";
import { initialUsers } from "./data";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    if (storedUsers && storedUsers.length > 0) {
      setUsers(storedUsers);
    } else {
      setUsers(initialUsers);
      localStorage.setItem("users", JSON.stringify(initialUsers));
    }
  }, []);

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const addUser = (newUser) => {
    const updatedUsers = [...users, { ...newUser, id: Date.now() }];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="app-container">
      <SearchIt addUser={addUser} />
      <UserTable users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
