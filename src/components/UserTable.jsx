import React, { useState } from "react";
import ExportButton from "./ExportButton"; // Import the ExportButton component
import ConfirmDeleteModal from "./ConfirmDeleteModal";

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
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(users.map((user) => user.id)); // Select all users
    }
  };

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setIsModalOpen(true); // Open the modal
  };

  const confirmDelete = () => {
    deleteUser(userIdToDelete);
    setIsModalOpen(false); // Close the modal after deleting
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
                checked={selectedUsers.length === users.length}
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
                <button onClick={() => handleDelete(user.id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render confirmation modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* Export Button */}
      <ExportButton users={users} selectedUsers={selectedUsers} />
    </div>
  );
};

export default UserTable;
