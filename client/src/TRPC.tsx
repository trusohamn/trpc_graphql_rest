import { useEffect, useState } from "react";
import { createReactQueryHooks } from "@trpc/react";
import type { TrpcRouter } from "../../server/src/trpc";

export const trpc = createReactQueryHooks<TrpcRouter>();

export function TRPC() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:2021/trpc",
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      const hello = await trpcClient.query("hello");
      const users = await trpcClient.query("users.list");
      console.log({ hello, users });

      const mutation = await trpcClient.mutation("users.create", {
        name: "Maria",
        surname: "Nova",
      });

      const usersMutated = await trpcClient.query("users.list");
      console.log({ mutation, usersMutated });
    };
    fetchData();
  }, [trpcClient]);

  return <div>TRPC</div>;
}

export default TRPC;
