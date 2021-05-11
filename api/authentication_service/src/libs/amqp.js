var amqp = require('amqplib/callback_api');

const send = (msg) => {
  amqp.connect(process.env.RABBITMQ_ADDRESS, (err, conn) => {
    conn.createChannel((err, ch) => {
      const q = process.env.QUEUE_NAME;
      ch.assertQueue(q, { durable: true });     
      ch.sendToQueue(q, Buffer.from(msg, 'utf8'));
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(() => { conn.close() }, 500);
  });
}

module.exports = {
  send
}