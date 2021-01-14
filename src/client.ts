import Discord, { Client } from 'discord.js';
import logger from './config/winston';

class App {
  private client: Client;

  constructor() {
    this.client = new Discord.Client();
  }

  login() {
    const { TOKEN = '' } = process.env;
    this.client.login(TOKEN).then(() => logger.info('Bot is running now'));
  }

  getClient() {
    return this.client;
  }
}

const app = new App();

export default app;
