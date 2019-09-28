const BaseCommand = require('./base-command');

class GetChannelsCommand extends BaseCommand {
  constructor(repository) {
    super();

    this.repository = repository;
  }

  async execute(params) {
    const channels = await this.repository.getChannels();

    return this.emit('success', channels);
  }
}

module.exports = GetChannelsCommand;
