import routerAuth from "./auth.router.js";
import routerComment from "./comment.router.js";
import routerNotification from "./notification.router.js";
import routerPost from "./post.router.js";
import routerUpload from "./upload.router.js";
import routerUser from "./user.router.js";

export default function routes(app) {
  app.use("/api", routerAuth);
  app.use("/api/user", routerUser);
  app.use("/api/post", routerPost);
  app.use("/api/notification", routerNotification);
  app.use("/api/comment", routerComment);
  app.use("/api/upload", routerUpload);
}
