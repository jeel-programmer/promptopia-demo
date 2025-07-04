// scripts/copy-assets.js
// Generated By: GPT-4o LLM (01-07-2025)


import dotenv from 'dotenv';
import cpy from 'cpy';
import { conditionalLog } from "./db-setup.js";

// Load environment variables.
// In production, we might want to suppress dotenv's own logging if it finds no .env file,
// as envs are expected to be set directly in the environment.
dotenv.config({ silent: process.env.NODE_ENV === 'production' });


async function copyStaticAndPublicFile() {
    await cpy(['.next/static/**'], '.next/standalone/.next/static');
    conditionalLog("Static files are copied in nextjs build!! {.next/standalone/}");

    await cpy(['public/**'], '.next/standalone/public');
    conditionalLog("Public files are copied in nextjs build!! {.next/standalone/}");
}

async function setupDatabaseFiles() {
    let databasetype = process.env.DATABASE_TYPE;

    if (databasetype == "sqlite") {
        await cpy(['./prisma/promptopia.db'], '.next/standalone');
        conditionalLog("promptopia.db is copied in nextjs build!! {.next/standalone/}");
    } else {
        conditionalLog(`Not Database Setup Avaliable For ${databasetype}!!`);
    }
}

async function main() {
    await copyStaticAndPublicFile();
    await setupDatabaseFiles();
    console.log('✅ Assets copied!');
}

main();
