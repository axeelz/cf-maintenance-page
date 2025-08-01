import { Console, Effect } from "effect";
import { pageConfig } from "../src/config.js";
import { generateMaintenanceHTML } from "../src/worker.js";

const program = Effect.gen(function* () {
  const config = yield* pageConfig;
  const html = generateMaintenanceHTML(config);

  yield* Console.log("Starting development server...");
  yield* Console.log("Server available at: http://localhost:3000");
  yield* Console.log("Press Ctrl+C to stop\n");

  Bun.serve({
    port: 3000,
    fetch() {
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
          "cache-control": "no-cache, no-store, must-revalidate",
        },
      });
    },
  });
});

Effect.runPromise(program);
