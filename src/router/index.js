import routerAuth from "./auth.router.js";
import routerComment from "./comment.router.js";
import routerMedia from "./media.router.js";
import routerNotification from "./notification.router.js";
import routerPost from "./post.router.js";
import routerShare from "./share.router.js";
import routerUser from "./user.router.js";

export default function routes(app) {
  app.use("/api", routerAuth);
  app.use("/api/user", routerUser);
  app.use("/api/share", routerShare);
  app.use("/api/post", routerPost);
  app.use("/api/notification", routerNotification);
  app.use("/api/media", routerMedia);
  app.use("/api/comment", routerComment);
}
