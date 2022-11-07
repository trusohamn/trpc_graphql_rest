import { useEffect, useState } from "react";
import { createReactQueryHooks } from "@trpc/react";
import type { TrpcRouter } from "../../server/src/trpc";
import { User } from "./types";
import Display from "./Display";

export const trpc = createReactQueryHooks<TrpcRouter>();

export function TRPC() {
  const [users, setUsers] = useState<User[]>([]);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:2021/trpc",
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const hello = trpcClient.query("hello");

      trpcClient.mutation("users.create", {
        name: "Maria",
        surname: "Nova",
      });

      const users = trpcClient.query("users.list");
      console.log({ hello, users });

      const cats = await trpcClient.query("cats.list");
    };
    fetchData();
  }, [trpcClient]);

  return (
    <div>
      <div>TRPC</div>
      <Display users={users} />
    </div>
  );
}

export default TRPC;
