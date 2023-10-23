const Bull = require('bull');
const processQueue = require('./processQueue');

const seatStatusQueue = new Bull(
  'seatStatus',
  `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
);

seatStatusQueue.process(processQueue);

seatStatusQueue.on('completed', (job, result) => {
  console.log(`Job completed: ${job.id}`);
});

seatStatusQueue.on('failed', (job, err) => {
  console.error(`Job failed: ${job.id}`, err);
});

module.exports = {
  seatStatusQueue,
};
