import React from "react";

const ExportButton = ({ users, selectedUsers }) => {
  const handleExport = () => {
    // Filter the selected users
    const usersToExport = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    // Convert the selected users to CSV format
    const csvData = usersToExport.map((user) => ({
      "First Name": user.firstName,
      "Last Name": user.lastName,
      Email: user.email,
    }));

    // Create CSV content
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "First Name,Last Name,Email",
        ...csvData.map(
          (u) => `${u["First Name"]},${u["Last Name"]},${u.Email}`
        ),
      ].join("\n");

    // Create a downloadable link
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "selected_users.csv";
    link.click();
  };

  return (
    <button onClick={handleExport} disabled={selectedUsers.length === 0}>
      EXPORT
    </button>
  );
};

export default ExportButton;
