import React, { Component } from 'react';
import * as seed from '../seed.json';
import _ from 'lodash';
import rulesCheck from "../rules";

type WorldProps = {
	iteration: number;
	species: number;
	resetted: boolean;
}

type WorldState = {
	world: number[][];
	mouseDown: boolean;
}

/**
 * Generates blank world
 *
 * @param {Object} opts - options
 * @param {Number} opts.rows - rows amount
 * @param {Number} opts.cols - cols amount
 */
const generateWorld = (opts: { rows: number, cols: number }) => {
	return [...new Array(opts.rows)].map(()=> {
		return [...new Array(opts.cols)].map(()=> 0);
	})
};

/**
 * Game world
 */
export default class World extends Component<WorldProps, WorldState> {
	constructor(props: Readonly<WorldProps>) {
		super(props);

		/**
		 * Generate blank world
		 * @type {Array}
		 */
		const world = generateWorld({
			rows: seed.cells,
			cols: seed.cells
		});

		this.state = { world, mouseDown: false };
	}

	/**
	 * Change the species of a cell to be of a selected type
	 *
	 * @param {number} rowIndex - row index
	 * @param {number} colIndex - column index
	 * @param {species} species - type of species 0 ... n
	 */
	changeCellSpecies(rowIndex: number, colIndex: number, species: number): void {
		/**
		 * Make a world copy
		 * @type {number[][]}
		 */
		const worldCopy = _.cloneDeep(this.state.world);

		/**
		 * Assign species to cell
		 */
		worldCopy[rowIndex][colIndex] = species;

		/**
		 * Save to state
		 */
		this.setState({ world: worldCopy });
	}

	/**
	 * Re-calculate world
	 */
	recalcWorld(): void {
		/**
		 * Make a copy of the game world
		 * @type {Array<Number>}
		 */
		const worldCopy = _.cloneDeep(this.state.world);

		/**
		 * Calculate the world's next state of this iteration
		 */
		this.state.world.forEach((row, rowIndex)=>{
			row.forEach((col, colIndex)=> {
				/**
				 * Collect all neighbors of current cell element
				 * @type {Array<Number>}
				 */
				const neighbors = this.getCellNeighbors(rowIndex, colIndex);

				/**
				 * Get a species
				 * @type {number}
				 */
				worldCopy[rowIndex][colIndex] = rulesCheck(neighbors);
			});
		});

		/**
		 * Save new world state
		 */
		this.setState({ world: worldCopy });
	}

	/**
	 * Get neighboring cells
	 * First item in resulting array is the reference element
	 *
	 * @param {number} row - y
	 * @param {number} col - x
	 * @returns Array<number|null>;
	 */
	getCellNeighbors(row: number, col: number): number[] {
		/**
		 * World state pointer
		 * @type {WorldState}
		 */
		const world = this.state.world;

		/**
		 * Initial column position
		 * @type {Number}
		 */
		let c = col - 1;

		/**
		 * Initial row position
		 * @type {Number}
		 */
		let r = row - 1;

		/**
		 * Pre-populate results with the reference element
		 * @type {Array<Number>}
		 */
		let result = [world[row][col]]; // [ world[row][col] ];

		/**
		 * Loop through all of the element's
		 * neighbors (9 elements including th reference element itself)
		 */
		for (let i = 1; i <= 9; i++) {
			/**
			 * Check whether row exists or not
			 * @type {Boolean}
			 */
			const rowExists = typeof world[r] !== 'undefined';

			/**
			 * Check whether column exists or not
			 * @type {Boolean}
			 */
			const colExists = rowExists && typeof world[r][c] !== 'undefined';

			/**
			 * Skip this step in case this cell is our
			 * reference element
			 * @type {Boolean}
			 */
			const skip = row === r && col === c;

			/**
			 * Add neighbor in case cell exists
			 * and we're not targetting the reference element
			 */
			if (!skip && colExists && rowExists)
				result.push(world[r][c]);

			/**
			 * Keep going through cells
			 * up until to the third
			 */
			if (i % 3 !== 0) { c++; }

			/**
			 * Reset column pointer to
			 * the first element, continue
			 * with the next row
			 */
			else { c = col - 1; r++; }
		}

		return result;
	}

	/**
	 * Seed species on mouseOver drag
	 * @param {number} rowIndex - x
	 * @param {number} colIndex - y
	 */
	mouseOverHandler(rowIndex: number, colIndex: number): void {
		if (this.state.mouseDown)
			this.changeCellSpecies(rowIndex, colIndex, this.props.species);
	}

	/**
	 * @param {WorldProps} prevProps - predchozi props
	 */
	componentDidUpdate(prevProps: Readonly<WorldProps>) {
		/**
		 * Recalc world on every iteration
		 */
		if (prevProps.iteration !== this.props.iteration)
			this.recalcWorld();

		/**
		 * Discard world on reset change
		 */
		if (this.props.resetted !== prevProps.resetted)
			this.setState({
				world: generateWorld({
					rows: seed.cells,
					cols: seed.cells
				})
			});
	}

	render() {
		const world = this.state.world.map((row, rowIndex)=>{
			return (
				<tr key={rowIndex}>
					{row.map((col, colIndex)=> {
						return <td data-x={rowIndex}
								   data-y={colIndex}
								   key={colIndex}
								   className={`type-${col}`}
								   onClick={()=>this.changeCellSpecies(rowIndex, colIndex, this.props.species)}
								   onMouseOver={()=>this.mouseOverHandler(rowIndex, colIndex)}
						>{col || 0}</td>
					})}
				</tr>
			);
		});

		return <>
			<table onMouseDown={()=>this.setState({ mouseDown: true })}
				   onTouchStart={()=>this.setState({ mouseDown: true })}
				   onMouseUp={()=>this.setState({ mouseDown: false })}
				   onTouchEnd={()=>this.setState({ mouseDown: false })}

				   onTouchMove={(e)=>{
						const cell = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY);
						const rowIndex = cell!.getAttribute('data-x');
						const colIndex = cell!.getAttribute('data-y');

						if (rowIndex && colIndex)
							this.mouseOverHandler(+rowIndex, +colIndex);
				   }}>
				<tbody>
					{world}
				</tbody>
			</table>
		</>
	}
}
