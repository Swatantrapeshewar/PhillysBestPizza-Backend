// import express from "express";
import Express from 'express';
import * as env from 'dotenv';
import routes from './routes';

env.config();
const PORT = 3000;

const app = Express();
app.use(Express.json());

app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
