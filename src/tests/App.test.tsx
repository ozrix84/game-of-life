import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

test('Renders controls', () => {
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
});
