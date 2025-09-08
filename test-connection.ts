import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to Neon!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
