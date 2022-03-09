import mongoose, { Collection } from 'mongoose';

const connection = {};

async function connect() {
  // Check if the db is already connected or not
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }

  // Its not connected and need to check previous connections
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    // previous connection is open and ready
    if (connection.isConnected === 1) {
      console.log('Use previous connection');
      return;
    }

    // connection is not ready so disconnecting
    await mongoose.disconnect();
  }

  //not connected - connecting first time
  const db = await mongoose.connect(process.env.MONGODB_URI);

  console.log('New connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('Not disconnected');
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();

  const collections = doc.collections.map((collection) => {
    collection._id = collection._id.toString();
    collection.createdAt = collection.createdAt.toString();
    collection.updatedAt = collection.updatedAt.toString();
    return collection;
  });

  doc.collections = collections;

  const images = doc.images.map((image) => {
    image._id = image._id.toString();
    return image;
  });
  doc.images = images;

  return doc;
}

const db = { connect, disconnect, convertDocToObj };

export default db;
