import app from './app.js';
import { PORT } from './config/env.config.js';
import connectDB from './config/db.config.js';

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
