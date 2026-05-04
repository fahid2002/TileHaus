import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const db = client.db("TileHaus");

export const auth = betterAuth({

    database: mongodbAdapter(db),
  
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "temp",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "temp",
    },
  },
  
  emailAndPassword: {
    enabled: true,
  },
});

export { db };