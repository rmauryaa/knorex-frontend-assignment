import React, { useState } from "react";
import ExportButton from "./ExportButton";
import DeleteAlert from "./DeleteAlert";
import './UserTable.css'; 

const UserTable = ({ users, deleteUser }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleSelect = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleDelete = () => {
    if (userIdToDelete !== null) {
      deleteUser(userIdToDelete);
    }
    setIsModalOpen(false);
  };

  const openDeleteModal = (id) => {
    setUserIdToDelete(id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedUsers.length === users.length && users.length > 0
                }
              />
            </th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => openDeleteModal(user.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteAlert
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />

      <ExportButton users={users} selectedUsers={selectedUsers} />
    </div>
  );
};

export default UserTable;
