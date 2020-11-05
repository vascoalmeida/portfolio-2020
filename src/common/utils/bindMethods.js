const bindMethods = (object, context) => {
	context = context || object;
	const objectProperties = Object.keys(object);

	objectProperties.map((property) => {
		console.log(typeof object[property])
	});
}

export default bindMethods;
