exports.handler = function (event, context) {
	context.succeed(`hello ${event.name}`);
};
