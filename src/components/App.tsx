import React, {useState} from 'react';
import World from "../components/World";
import Header from '../components/Header';

/**
 * Root App
 * Obsluha krokovani a ovladacich prvku
 * @constructor
 */
const App: React.FC = () => {
	/**
	 * Iteration counter
	 */
	const [ iteration, setIteration ] = useState<number>(0);

	/**
	 * Inerval ID pointer
	 */
	const [ intervalId, setIntervalId ] = useState<number>(0);

	/**
	 * Selected species for drawing
	 */
	const [ species, setSpecies ] = useState<number>(1);

	/**
	 * Reset state
	 */
	const [ resetted, setResetted ] = useState<boolean>(false);

	/**
	 * Start iterating
	 */
	function start(): void {
		/**
		 * Return in case we're already running
		 */
		if (intervalId) return;

		/**
		 * Make a copy of the current iteration
		 */
		let counter = iteration;

		setIntervalId(window.setInterval(() => {
			counter++;
			setIteration(counter)
		},50));

		setResetted(false);
	}

	/**
	 * Stop iterating
	 */
	function stop(): void {
		window.clearInterval(intervalId);
		setIntervalId(0);
	}

	/**
	 * Reset game world state
	 */
	function reset(): void {
		setResetted(!resetted);
		setIteration(0);
		stop();
	}

	/**
	 * Set selected species for drawing
	 * @param {React.ChangeEvent} e - Change event
	 */
	function switchSpeciesType(e: React.ChangeEvent<HTMLSelectElement>): void {
		setSpecies(+e.target.value);
	}

	return <>
		<Header onClick={()=>{!intervalId ? start() : stop()}}
				onChange={(e)=> switchSpeciesType(e)}
				onReset={()=> reset()}
				intervalId={intervalId}
				iteration={iteration}
		/>

		<hr/>

		<World species={species}
			   iteration={iteration}
			   resetted={resetted}
		/>
	</>;
}

export default App;
