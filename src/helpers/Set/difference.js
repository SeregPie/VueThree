export default function(set, ...otherSets) {
	let returns = new Set();
	set.forEach(value => {
		if (otherSets.every(otherSet => !otherSet.has(value))) {
			returns.add(value);
		}
	});
	return returns;
}
