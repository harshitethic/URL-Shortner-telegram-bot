const Kurzer = require('kurzer-url');
const EhUrl = require('eh-url');

const { constants } = require('../utils');

const kurzer = new Kurzer();
const ehUrl = new EhUrl();

class ShortService {
  async short(bot, chat, url) {
    try {
      const validUrl = await ehUrl.check(url);

      if (!validUrl) {
        await bot.sendMessage(chat.id, constants.MESSAGE_INVALID_URL);

        return;
      }

      const shortened = await kurzer.short(url);

      await bot.sendMessage(chat.id, this.getMessage(shortened));
    } catch (error) {
      console.error(error);

      await bot.sendMessage(chat.id, constants.MESSAGE_ERROR_TRY_AGAIN);
    }
  }

  getMessage(shortened) {
    if (shortened.errorcode && shortened.errorcode > 2) {
      return constants.MESSAGE_ERROR_TRY_AGAIN;
    }

    if (shortened.errorcode && shortened.errorcode <= 2) {
      return shortened.errormessage;
    }

    return shortened.shorturl;
  }
}

module.exports = ShortService;
