import { ClientEvents } from 'discord.js';

export function DiscordEvent<K extends keyof ClientEvents>(name: K) {
  return function (constructFN: Function) {
    constructFN.prototype.eventType = name;
  };
}

export interface EventHandler {
  execute<K extends keyof ClientEvents>(...args: ClientEvents[K]): void;
}
