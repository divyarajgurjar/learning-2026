import { kafkaClient } from "./kafka-client.js";

async function setup() {
  const admin = kafkaClient.admin();
  console.log("Admin connecting...");

  await admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [rider-updates]");

  await admin.createTopics({
    topics: [
      {
        topic: "location-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [location-updates]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

setup()