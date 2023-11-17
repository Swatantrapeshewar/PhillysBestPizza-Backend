import Express from 'express';
import * as env from 'dotenv';
import routes from './routes';
import errorMiddleware from './middleware/ErrorMiddleware';
import { WinstonLogger } from './common/logging/WinstonLogger';

const logger = new WinstonLogger();

// reload path
process.env.NODE_PATH = __dirname;

env.config();
const PORT = 3000;

const app = Express();
app.use(Express.json());
app.use('/api', routes);
app.use(errorMiddleware);

app.listen(PORT, () => {
	logger.info(`App listning on the port ${PORT}`);
});
