import { fastify } from './src/app';

const start = async () => {
  try {
    await fastify.listen({ port: 8080 });
    console.log(`Server is running at http://localhost:8080`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();