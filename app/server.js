import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(morgan("tiny"));
app.use(express.static(`${process.cwd()}/public`));

app.listen(port, () => console.log(`Listening on port ${port}`));
