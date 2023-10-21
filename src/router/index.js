import routerUser from "./user.router.js";

export default function routes(app) {
  app.use("/api", routerUser);
}
