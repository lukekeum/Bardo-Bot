import { ClientEvents } from 'discord.js';

export function DiscordEvent<K extends keyof ClientEvents>(name: K) {
  return function (constructFN: Function) {
    constructFN.prototype.eventType = name;
  };
}

export interface EventHandler {
  execute(...args: any[]): void;
}
