import { createConnection } from 'typeorm';
import Server from './server';
async function run() {
    await createConnection();
    Server.getInstance().start();
}
run();
