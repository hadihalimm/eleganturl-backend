import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors"
import urlController from "./controller.ts";
import mongooseClient from "./db.ts";

const app = new Hono();
console.log(mongooseClient.connection.readyState)

app.use("/*", cors())
app.route("/url", urlController);

Deno.addSignalListener("SIGINT", () => {
    mongooseClient.disconnect()
    console.log("Disconnected from MongoDB.")
})
Deno.serve(app.fetch);
