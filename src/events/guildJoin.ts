import { Guild } from 'discord.js';
import { DiscordEvent, EventHandler } from '../lib/EventManager';

@DiscordEvent('guildCreate')
class OnGuildJoin implements EventHandler {
  public execute(guild: Guild) {
    // TODO: Add Guild Data to Database
  }
}

export default OnGuildJoin;
