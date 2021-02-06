import React, {ChangeEvent} from 'react';
import * as seed from '../seed.json';

type HeaderProps = {
	onClick(): void;
	onChange(e: ChangeEvent<HTMLSelectElement>): void;
	onReset(): void;
	intervalId: number;
	iteration: number;
}

/**
 * Header controls and information display
 * @param {HeaderProps} props
 * @constructor
 */
const Header: React.FC<HeaderProps> = (props) => {
	return <>
		<div>
			<button onClick={()=>props.onClick()}>
				{!props.intervalId ? 'Start' : 'Stop'}
			</button>

			<button onClick={()=>props.onReset()}>Reset</button>

			<label>
				<strong>Species:</strong>
				<select onChange={(e)=>props.onChange(e)}>
					{[...new Array(seed.species + 1)].map((el, i)=> {
							return <option key={i} value={i}>{i}</option>
						}
					)}
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
