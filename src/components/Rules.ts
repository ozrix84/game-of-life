import { Random } from "random-js";
const random = new Random();

type Params = {
	root: number;
	neighborCounter: number[];
}

/**
 * Check whether a cell will reproduce
 * @param {Params} p - parameters
 * @returns {Boolean}
 */
export function reproduces(p: Params) {
	/**
	 * Individual parent species that might spawn offspring
	 * @type {Array<Number>}
	 */
	let parents: number[] = [];

	/**
	 * If there are exactly three organisms of one type surrounding one element,
	 * they may give birth into that cell. The new organism is the same type as its parents.
	 */
	p.neighborCounter.forEach((neighborTypeCount, i) => {
		if (i > 0 && neighborTypeCount === 3)
			parents.push(i);
	});

	/**
	 * If this condition is true for more than one species on the same element then species
	 * type for the new element is chosen randomly.
	 */
	if (parents.length >= 1)
		return parents[random.integer(0, parents.length - 1)];
	else
		return null;
}

/**
 * Check whether a cell will survive
 * @param {Params} p - parameters
 * @returns {Boolean}
 */
export function survives(p: Params){
	return p.neighborCounter[p.root] === 2 || p.neighborCounter[p.root] === 3;
}

/**
 * Check whether a cell is isolated
 * @param {Params} p - parameters
 * @return {Boolean}
 */
export function isolated(p: Params) {
	return p.neighborCounter[p.root] < 2;
}

/*
 * Check whether a cell is crowded
 * @param {Params} p - parameters
 * @returns {Number}
 */
export function crowded(p: Params) {
	return p.neighborCounter.reduce((a, v, i)=> {
		return p.root && p.root === i && v >= 4 ? a + 1 : a;
	},0);
}

const rules = (cells: number[]): number => {
	/**
	 * The root (initial) cell
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
	 * Function parameters for rule checks
	 */
	let params = { root, neighborCounter };

	/*
	 * If there are less than two organisms of one type surrounding one of the same type
	 * then it will die due to isolation.
	 */
	if (isolated(params)) return 0;

	/*
	 * If there are four or more organisms of one type surrounding one of the same type
	 * then it will die due to overcrowding.
	 */
	if (crowded(params)) return 0;

	/**
	 * If there are two or three organisms of the same type living in the elements
	 * surrounding an organism of the same, type then it may survive.
	 */
	if (survives(params)) return root;

	/**
	 * If there are exactly three organisms of one type surrounding one element,
	 * they may give birth into that cell. The new organism is the same type as its parents.
	 * If this condition is true for more than one species on the same element then species
	 * type for the new element is chosen randomly.
	 */
	const result = reproduces(params);
	if (result) return result;

	/**
	 * Return initial species
	 */
	return root;
}

export default rules;
