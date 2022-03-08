import mongoose from 'mongoose';

const connection = {};

async function connect() {
  // Check if the db is already connected or not
  if (connection.isConnected) {
    console.log('\nAlready connected');
    return;
  }

  // Its not connected and need to check previous connections
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    // previous connection is open and ready
    if (connection.isConnected === 1) {
      console.log('\nUse previous connection');
      return;
    }

    // connection is not ready so disconnecting
    await mongoose.disconnect();
  }

  //not connected - connecting first time
  const db = await mongoose.connect(process.env.MONGODB_URI);

  console.log('\nNew connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('\nNot disconnected');
    }
  }
}

const db = { connect, disconnect };

export default db;
