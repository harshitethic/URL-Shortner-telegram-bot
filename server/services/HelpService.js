const { constants } = require('../utils');

class HelpService {
  async help(bot, chat) {
    try {
      const commands = [
        { command: '/short <b>{url}</b>', description: 'Short URL' },
      ];
      let message = '';

      message += constants.MESSAGE_HELP;
      message += commands.map((command) => `${command.command} - ${command.description}`).join('\n');

      await bot.sendMessage(chat.id, message, { parse_mode: 'html' });
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }
}

module.exports = HelpService;
