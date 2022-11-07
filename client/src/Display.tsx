import { User } from "./types";

export function Display({ users }: { users: User[] }) {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        margin: 10,
      }}
    >
      <div>
        <b>Users</b>
        <ul>
          {users.map((user) => {
            return <li>{user.name + " " + user.surname} </li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Display;
