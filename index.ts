import app from "./src/app";
import envVars from "./src/config/env.config";

app.listen(envVars.PORT, () => {
  console.log(`Server is running on port ${envVars.PORT}`);
});
