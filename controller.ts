import { Context, Hono } from "@hono/hono";
import urlModel from "./model.ts";

const urlController = new Hono()
  .get("/:alias", (c) => getUrl(c))
  .post("/", (c) => createUrl(c))


const getUrl = async (c: Context) => {
  const url = await urlModel.findOne({ alias: c.req.param("alias") });
  if (!url) {
    return c.json({
      success: false,
      message: "This URL does not exist.",
      data: null
    }, 400)
  }
  return c.redirect(url.originalUrl!);
};

const createUrl = async (c: Context) => {
  const { originalUrl, alias } = await c.req.json();

  const aliasAlreadyExist = await urlModel.findOne({ alias });
  if (aliasAlreadyExist) {
    return c.json({
      success: false,
      message : "This URL already exist.",
      data: aliasAlreadyExist
    }, 400)
  }

  const newUrl = await urlModel.create({
    alias: alias,
    originalUrl: originalUrl,
  });

  return c.json({
    success: true,
    message: "Successfully created new URL.",
    data: newUrl,
  }, 201);
};

export default urlController;
