import { HttpApi, HttpApiBuilder, HttpApiEndpoint, HttpApiGroup } from "@effect/platform";
import { Effect, type Layer, Schema } from "effect";

const Menu = Schema.Struct({
  content: Schema.String.pipe(Schema.nonEmptyString()),
});

const MenuApiGroup = HttpApiGroup.make("menu").add(
  HttpApiEndpoint.post("analyze", "/analyze").setPayload(Menu),
);

const MenuApi = HttpApi.empty.add(MenuApiGroup);

const MenuApiLayer: Layer.Layer<HttpApiGroup.ApiGroup<"menu">> =
  HttpApiBuilder.group(MenuApi, "menu", (handlers) =>
    handlers
      // the parameters & payload are passed to the handler function.
      .handle("analyze", ({ payload }) =>
        Effect.succeed(
          { payload}
        )
      )
  );

export { MenuApi, MenuApiLayer };
