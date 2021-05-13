const amqp = require('amqplib');

const pull = async (queue, cb) => {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_ADDRESS);
    const channel = await conn.createChannel();
    channel.assertQueue(queue, { durable: true });
    channel.prefetch(1);
    console.log(queue)
    channel.consume(queue, msg => { console.log(msg); cb(JSON.parse(msg.content.toString())) }, { noAck: true });
    setTimeout(function () { conn.close(); pull(queue, cb) }, 500000);
  } catch (e) {
    console.log(e)
    setTimeout(() => pull(queue, cb), 6000);
    return
  }
}

const send = async (msg, queue) => {
  const conn = await amqp.connect(process.env.RABBITMQ_ADDRESS)
  const channel = await conn.createChannel();
  channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(msg, 'utf8'));
  setTimeout(() => { conn.close() }, 500);
}

module.exports = {
  consume: pull,
  send
};
