import { Guild } from 'discord.js';
import { DiscordEvent, EventHandler } from '../lib/EventManager';

@DiscordEvent('guildDelete')
class OnQuitGuild implements EventHandler {
  public execute(guild: Guild) {
    // TODO: Remove Guild Data from Database
  }
}

export default OnQuitGuild;
