import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import World from '../components/World';

test('World is an HTML table', ()=>{
	/**
	 * World props
	 */
	const props = {
		iteration: 0,
		species: 0,
		resetted: false
	}

	/**
	 * Render world
	 */
	const { container } = render(<World iteration={props.iteration} species={props.species} resetted={props.resetted} />);

	/**
	 * Get world HTML element
	 */
	const worldTable = container.getElementsByTagName('table')[0];

	/**
	 * Expect it to be rendered
	 */
	expect(worldTable).toBeInTheDocument();
});
