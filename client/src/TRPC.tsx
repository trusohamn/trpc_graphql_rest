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
      const post = await trpcClient.query("post.list");
      console.log({ hello, post });
      const mutation = await trpcClient.mutation("post.create", {
        title: "new2!",
      });

      const post2 = await trpcClient.query("post.list");
      console.log({ mutation, post2 });
    };
    fetchData();
  }, [trpcClient]);

  return <div>TRPC</div>;
}

export default TRPC;
