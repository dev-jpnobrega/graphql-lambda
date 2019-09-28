const Adapter = (CommandFactory) => (rootValue, args) => {
  const command = new CommandFactory().create();

  return new Promise(async (resolve, reject) => {
    command.on('success', data => resolve(data));
    command.on('onValidateFalied', data => reject(data));

    await command.execute(args);
  });
}

const AdapterSubscription = (CommandFactory) => (rootValue, args) => {
  const command = new CommandFactory().create();

  return {
    resolve: new Promise(async (resolve, reject) => {
      command.on('success', data => resolve(data));
      command.on('onValidateFalied', data => reject(data));

      await command.execute({ ...rootValue, ...args });
    }),
    subscribe: command.subscribe,
  };
}

module.exports = {
  Adapter,
  AdapterSubscription,
}