import Discord, { Client, Collection, Message } from 'discord.js';
import { readdirSync } from 'fs';

import logger from './config/winston';

type TArgument = Array<string> | null;

interface ICommandParam {
  message: Message;
  args: TArgument;
}

type TExecute = ({ message, args }: ICommandParam) => void;

class Bot {
  public client: Client;

  private commands: Collection<string, TExecute>;
  private prefix: string;

  constructor() {
    this.client = new Discord.Client();
    this.prefix = process.env.PREFIX || '::';

    // Register Command handler && Event handler
    this.handleCommand();
    this.handleEvent();

    // varify command on message event
    this.client.on('message', this.checkCommand);
  }

  public login() {
    const { TOKEN = '' } = process.env;
    this.client.login(TOKEN).then(() => logger.info('Bot is running now'));
  }

  private handleCommand() {
    const CommandDir = './src/commands';
    const commandFiles = readdirSync(CommandDir).filter((file) =>
      file.endsWith('.ts')
    );

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`).default;
      if (typeof command === 'function') continue;
      const { command: cmd, execute } = new command();
      if (typeof cmd === 'string') this.commands.set(cmd, execute);
      else {
        for (const command of cmd) {
          this.commands.set(command, execute);
        }
      }
    }
  }

  private checkCommand() {
    const commandHandler = async (message: Message) => {
      if (!message.content.startsWith(this.prefix) || message.author.bot)
        return;

      const args = message.content.slice(this.prefix.length).trim().split(/ +/);
      const command = args?.shift()?.toLocaleLowerCase() || '';

      if (!this.commands.has(command)) {
        // TODO: Add help command
        return;
      }

      try {
        const func = this.commands.get(command) || function () {};
        await func({ message, args });
      } catch (err) {
        logger.error(err.message);
        message.reply('An error occurred while processing the command');
      }
    };
    return commandHandler;
  }

  private handleEvent() {
    const EventDir = './src/events';
    const eventFiles = readdirSync(EventDir).filter((file) =>
      file.endsWith('.ts')
    );

    for (const file of eventFiles) {
      const event = require(`./events/${file}`).default;
      if (typeof event === 'function') continue;
      const { eventType, execute } = new event();
      this.client.on(eventType, execute);
    }
  }
}

const client = new Bot();

export default client;
