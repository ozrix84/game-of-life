import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';
import World from "../components/World";

test('Renders controls and world', () => {
  	render(<App />);

	/**
	 * Query the start button
	 */
	const startButton = screen.getByText(/start/i);
	expect(startButton).toBeInTheDocument();

	/**
	 * Query the reset button
	 */
	const resetButton = screen.getByText(/reset/i);
	expect(resetButton).toBeInTheDocument();

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
