import { useEffect, useState } from "react";
import Display from "./Display";
import { User } from "./types";

export function TRPC() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // TODO add user
      const response = await fetch("http://localhost:2021/rest/users").then(
        (res) => res.json()
      );
      console.log(response);
      setUsers(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>REST</div>
      <div>
        <Display users={users} />
      </div>
    </div>
  );
}

export default TRPC;
