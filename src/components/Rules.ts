import { Random } from "random-js";
const random = new Random();

const life = (cells: number[]): number => {
	/**
	 * The root cell
	 * @type {number}
	 */
	const root = cells[0];

	/**
	 * Get neighbors sans root
	 * @type {Array<Number>}
	 */
	const neighbors = cells.slice(1);

	/**
	 * Counter for neighbor organism types
	 * @type {Array<Number>}
	 */
	const neighborCounter = [ 0, 0, 0, 0, 0 ];

	/**
	 * Count individual neighbor types
	 */
	neighbors.forEach(neighbor => {
		neighborCounter[neighbor]++;
	});

	/**
	 * Individual parent species that might spawn offspring
	 * @type {Array<Number>}
	 */
	let parents: number[] = [];

	/*
	 * If there are less than two organisms of one type surrounding one of the same type
	 * then it will die due to isolation.
	 */
	if (neighborCounter[root] < 2) return 0;

	/**
	 * If there are two or three organisms of the same type living in the elements
	 * surrounding an organism of the same, type then it may survive.
	 */
	if (neighborCounter[root] === 2 || neighborCounter[root] === 3)
		return root;

	/*
	 * If there are four or more organisms of one type surrounding one of the same type
	 * then it will die due to overcrowding.
	 */
	const crowded = neighborCounter.reduce((a, v, i)=> {
		return root && root === i && v >= 4 ? a + 1 : a;
	},0);
	if (crowded) return 0;

	/**
	 * If there are exactly three organisms of one type surrounding one element,
	 * they may give birth into that cell. The new organism is the same type as its parents.
	 */
	neighborCounter.forEach((neighborTypeCount, i) => {
		if (i > 0 && neighborTypeCount === 3)
			parents.push(i);
	});

	/**
	 * If this condition is true for more than one species on the same element then species
	 * type for the new element is chosen randomly.
	 */
	if (parents.length >= 1)
		return parents[random.integer(0, parents.length - 1)];

	/**
	 * Return initial species
	 */
	return root;
}

export default life;
