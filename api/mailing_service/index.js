const amqp = require('amqplib/callback_api');
const messageProcessor = require('./src/messageProcessor')

function pull() {
  amqp.connect(process.env.RABBITMQ_ADDRESS, function (err, conn) {
    if (err) {
      console.log(err)
      setTimeout(pull, 6000);
      return
    }
    conn.createChannel(function (err, ch) {
      const q = process.env.QUEUE_NAME;
      ch.assertQueue(q, { durable: true });
      ch.prefetch(1);
      ch.consume(q, msg => messageProcessor(msg.content.toString()), { noAck: true });
    });
    setTimeout(function () { conn.close(); pull() }, 500000);
  });
}

pull()