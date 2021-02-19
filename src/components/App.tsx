import React, { useEffect, useState } from 'react';
import World from "../components/World";
import Header from '../components/Header';
import usePrevious from "../hooks/usePrevious";

/**
 * Root App
 * Handles iterations, renders world and controls
 * @constructor
 */
function App() {
	/**
	 * Iteration counter
	 */
	const [ iteration, setIteration ] = useState<number>(0);

	/**
	 * Inerval ID pointer
	 */
	const [ timeoutId, setTimeoutId ] = useState<number>(0);

	/**
	 * Selected species for drawing
	 */
	const [ species, setSpecies ] = useState<number>(1);

	/**
	 * Reset state
	 */
	const [ resetted, setResetted ] = useState<boolean>(false);

	/**
	 * Iteration delay
	 */
	const [ iterationDelay, setIterationDelay ] = useState<number>(40);
	const prevIterationDelay = usePrevious(iterationDelay);

	/**
	 * Start iterating
	 */
	function start(): void {
		let counter = iteration;

		function loop(): void {
			counter++;
			setIteration(counter);
			setTimeoutId(window.setTimeout(loop, iterationDelay));
		}
		loop();
	}

	/**
	 * Stop iterating
	 */
	function stop(): void {
		window.clearTimeout(timeoutId);
		setTimeoutId(0);
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

	/**
	 * Switch the delay between renders
	 * @param {React.ChangeEvent<HTMLSelectElement>>} e - event
	 */
	function switchDelay(e: React.ChangeEvent<HTMLSelectElement>): void {
		setIterationDelay(+e.target.value);
	}

	/**
	 * Re-run on iteration delay change
	 */
	useEffect(()=>{
		if (prevIterationDelay && prevIterationDelay !== iterationDelay) {
			stop();
			if (timeoutId) start();
		}
	});

	return <>
		<div className="game-of-life">
			<Header onClick={()=>{!timeoutId ? start() : stop()}}
					onChangeSpecies={(e)=> switchSpeciesType(e)}
					onChangeSpeed={(e)=> switchDelay(e)}
					onReset={()=> reset()}
					timeoutId={timeoutId}
					iteration={iteration}
					iterationDelay={iterationDelay}
					species={species}
			/>

			<World species={species}
				   iteration={iteration}
				   resetted={resetted}
			/>
		</div>
	</>;
}

export default App;
