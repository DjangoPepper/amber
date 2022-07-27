// My function
const myfunction = async function(x, y) {
	return [
		x,
		y,
	];
}

// Start function
const start = async function(a, b) {
	const result = await myfunction('test', 'test');

	console.log(result);
}

// Call start
start();