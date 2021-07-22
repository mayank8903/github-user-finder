import React from "react";
import UserItem from "./UserItem";
import LoadingSign from "../ui/LoadingSign";

const Users = ({ users, loading }) => {
  if (loading) {
    return <LoadingSign />;
  } else {
    return (
      <div style={userStyles}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

export default Users;
