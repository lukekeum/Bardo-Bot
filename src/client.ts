import Discord, { Client } from 'discord.js';

class App {
  private client: Client;

  constructor() {
    this.client = new Discord.Client();
  }

  login() {
    const { TOKEN = '' } = process.env;
    this.client.login(TOKEN).then(() => console.log('Bot is running now'));
  }

  getClient() {
    return this.client;
  }
}

const app = new App();

export default app;
