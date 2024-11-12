import { Layer } from "effect";
import { MenuApi, MenuApiLayer } from "./MenuApi.js";
import { type HttpApi, HttpApiBuilder, HttpMiddleware, HttpServer } from "@effect/platform";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { createServer } from "node:http";

const Api: Layer.Layer<HttpApi.Api> = HttpApiBuilder.api(MenuApi).pipe(
  Layer.provide(MenuApiLayer)
) 

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  // Add CORS middleware
  Layer.provide(HttpApiBuilder.middlewareCors()),
  // Provide the API implementation
  Layer.provide(Api),
  // Log the address the server is listening on
  HttpServer.withLogAddress,
  // Provide the HTTP server implementation
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
)

Layer.launch(HttpLive).pipe(NodeRuntime.runMain)