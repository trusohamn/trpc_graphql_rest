import { useEffect, useState } from "react";
import { createReactQueryHooks } from "@trpc/react";
import type { TrpcRouter } from "../../server/src/trpc";

export const trpc = createReactQueryHooks<TrpcRouter>();

export function TRPC() {
  const [users, setUsers] = useState<
    {
      id: number;
      name: string;
      surname: string;
    }[]
  >([]);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:2021/trpc",
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const hello = await trpcClient.query("hello");

      await trpcClient.mutation("users.create", {
        name: "Maria",
        surname: "Nova",
      });

      const users = await trpcClient.query("users.list");
      console.log({ hello, users });
      setUsers(users);
    };
    fetchData();
  }, [trpcClient]);

  return (
    <div>
      <div>TRPC</div>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}

export default TRPC;
