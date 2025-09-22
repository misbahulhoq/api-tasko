import webpush from "web-push";
import envVars from "./env.config";

webpush.setVapidDetails(
  "mailto:extraordinarymisbah@gmail.com",
  envVars.PUBLIC_VAPID_KEY,
  envVars.PRIVATE_VAPID_KEY
);

export { webpush };
export default webpush;
