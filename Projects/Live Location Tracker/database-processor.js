import { kafkaClient } from "./kafka-client.js";

async function init() {
  const kafkaConsumer = kafkaClient.consumer({ groupId: "database-processor" });
  
  await kafkaConsumer.connect();
  await kafkaConsumer.subscribe({ topics: ["location-updates"], fromBeginning: true });

  await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }) => {
      const data = JSON.parse(message.value.toString());
       
      console.log(`[DB SERVICE] stored location for User ${data.id}`);

      await heartbeat(); 
    },
  });
}

init();
