import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    api: 'Controla CRM API',
    version: '1.0.0',
    status: 'Running',
  });
});

app.use(helmet());
app.use(cors());

export default app;
