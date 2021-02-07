import React, {ChangeEvent} from 'react';
import * as seed from '../seed.json';

type HeaderProps = {
	onClick(): void;
	onChangeSpecies(e: ChangeEvent<HTMLSelectElement>): void;
	onChangeSpeed(e: ChangeEvent<HTMLSelectElement>): void;
	onReset(): void;
	iterationDelay: number;
	timeoutId: number;
	iteration: number;
	species: number;
}

const delay = [ 15, 50, 120, 500 ];

/**
 * Header controls and information display
 * @param {HeaderProps} props
 * @constructor
 */
const Header: React.FC<HeaderProps> = (props) => {
	return <>
		<div>
			<button onClick={()=>props.onClick()}>
				{!props.timeoutId ? 'Start' : 'Stop'}
			</button>

			<button onClick={()=>props.onReset()}>Reset</button>

			<label>
				<strong>Species:</strong>
				<select value={props.species} onChange={(e)=>props.onChangeSpecies(e)}>
					{[...new Array(seed.species + 1)].map((el, i)=> {
							return <option key={i} value={i}>{i}</option>
						}
					)}
				</select>
			</label>

			<label>
				<strong>Delay (ms):</strong>
				<select value={props.iterationDelay} onChange={(e)=>props.onChangeSpeed(e)}>
					{delay.map((delay,i)=>{
						return <option key={i} value={delay}>{delay}</option>
					})}
				</select>
			</label>
		</div>

		<div>
			<span>
				<strong>Cells:</strong>
				{seed.cells}
			</span>

			<span>
				<strong>Species:</strong>
				{seed.species}
			</span>

			<span>
				<strong>Iterations:</strong>
				{Number(props.iteration).toLocaleString('cs')}
			</span>
		</div>
	</>
}

export default Header;
