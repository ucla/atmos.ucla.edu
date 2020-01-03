import express from "express";

const app = express();
const port = 3000;

app.use(express.static(`${process.cwd()}/public`));

app.listen(port, () => console.log(`Listening on port ${port}`));
