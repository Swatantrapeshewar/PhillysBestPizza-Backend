// import express from "express";
import Express from 'express';
import * as env from 'dotenv';
import { route } from './routes';

env.config();
const PORT = 3000;

const app = Express();
app.use(Express.json());
route(app);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
