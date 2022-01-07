import React from "react";
import { Link } from "react-router-dom";

const FriendsList = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Friends Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {users &&
          users.map((user) => (
            <div key={user._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {user.username} <br />
                  <span className="text-white" style={{ fontSize: "1rem" }}>
                    currently has {user.focus ? user.focuses.length : 0} focal
                    {user.focuses && user.focuses.length === 1
                      ? " point"
                      : " points"}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/users/${user._id}`}
                >
                  View and explore their neural pathways.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsList;
