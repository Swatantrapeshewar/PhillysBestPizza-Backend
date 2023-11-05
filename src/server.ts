import express, { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
