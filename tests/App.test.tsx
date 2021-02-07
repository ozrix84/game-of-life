import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/components/App';

test('App renders controls and world', () => {
  	const { container } = render(<App />);

	/**
	 * Query the start button
	 */
	const startButton = screen.getByTestId('start');
	expect(startButton).toBeInTheDocument();

	/**
	 * Query the reset button
	 */
	const resetButton = screen.getByText(/Reset/i);
	expect(resetButton).toBeInTheDocument();

	/**
	 * Query the world
	 */
	const worldTable = container.getElementsByTagName('table')[0];
	expect(worldTable).toBeInTheDocument();
});
