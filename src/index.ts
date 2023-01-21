import app from "./app";
import swaggerDocs from "./swagger";

const PORT = 9001;

app.listen(PORT, () => {
  console.log(`Server init at http://localhost:${PORT}`);
  swaggerDocs(app, PORT);
});
