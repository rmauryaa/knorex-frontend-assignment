import React from "react";

const ExportButton = ({ users, selectedUsers }) => {
  const handleExport = () => {
    
    const usersToExport = users.filter((user) =>
      selectedUsers.includes(user.id)
    );

    
    const csvData = usersToExport.map((user) => ({
      "First Name": user.firstName,
      "Last Name": user.lastName,
      Email: user.email,
    }));

   
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "First Name,Last Name,Email",
        ...csvData.map(
          (u) => `${u["First Name"]},${u["Last Name"]},${u.Email}`
        ),
      ].join("\n");

    
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "Knorex.csv";
    link.click();
  };

  return (
    <button onClick={handleExport} disabled={selectedUsers.length === 0}>
      EXPORT
    </button>
  );
};

export default ExportButton;
