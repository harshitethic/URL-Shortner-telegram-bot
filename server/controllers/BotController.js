const { telegramConfig } = require('../configs');
const { constants } = require('../utils');

const {
  HelpService,
  ShortService,
} = require('../services');

const helpService = new HelpService();
const shortService = new ShortService();

class BotController {
  constructor(bot) {
    this.bot = bot;
  }

  async handle() {
    try {
      this.bot.on(constants.ON_MESSAGE, ($) => {
        const command = $.text ? $.text.replace(telegramConfig.username, '') : $.text;

        switch (command) {
          case constants.COMMAND_HELP:
            helpService.help(this.bot, $.chat);

            break;
          default:
            break;
        }
      });

      this.bot.onText(constants.COMMAND_SHORT_REGEX, ($, match) => {
        const params = match[1].split(' ');
        const url = params[0];

        shortService.short(this.bot, $.chat, url);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = BotController;
