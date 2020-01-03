import express from "express";

const app = express();
const port = 3000;

app.use("/", express.static(`${process.cwd()}/public/index.html`));
console.log(`${process.cwd()}/public/index.html`);

app.listen(port, () => console.log(`Listening on port ${port}`));
