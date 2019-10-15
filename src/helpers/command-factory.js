class CommandFactory {
  static createAndPromisify(Factory) {
    return CommandFactory.executeCommandAsPromise.bind(null, Factory);
  }

  static executeCommandAsPromise(Factory, ...args) {
    const command = new Factory().create();

    return new Promise(async (resolve, reject) => {
      command.on('success', data => resolve(data));
      command.on('discart', data => reject(data));

      await command.execute(...args);
    });
  }
}

module.exports = CommandFactory;