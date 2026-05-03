import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: MONGODB_URI');
}

const uri = process.env.MONGODB_URI;

// 1. Next.js HMR-Safe MongoDB Connection
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development, we use a global variable to preserve the connection
  // across Hot Module Replacements. This stops the server from crashing!
  let globalWithMongo = global;
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production, we don't need the global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// 2. Await the safely cached promise
const connectedClient = await clientPromise;
const db = connectedClient.db("TileHaus");

// 3. Initialize Better Auth
export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: connectedClient // Passing the client here enables advanced database transactions
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});