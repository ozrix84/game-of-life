import { reproduces, survives, crowded, isolated } from "../src/rules";

test('Cell reproduces', () => {
	// 3 cells of type 1
	const neighborCounter = [ 0, 3, 0, 0, 0 ];

	// cell is of type 1
	const root = 1;

	// expect new cell type to be of 1
	expect(reproduces({root, neighborCounter})).toBe(1);
});

test('Cell survives', ()=> {
	const neighborCounter = [ 0, 2, 0, 0, 0 ];

	// cell is of type 1
	const root = 1;

	// expect cell to survive
	expect(survives({root, neighborCounter})).toBe(true);
});

test('Cell is isolated', ()=> {
	const neighborCounter = [ 0, 1, 0, 0, 0 ];

	// cell is of type 1
	const root = 1;

	// expect cell to be isolated
	expect(isolated({root, neighborCounter})).toBe(true);
});

test('Cell is crowded', ()=> {
	const neighborCounter = [ 0, 5, 0, 0, 0 ];

	// cell is of type 1
	const root = 1;

	// expect cell to be crowded
	expect(crowded({root, neighborCounter})).toBe(1);
});
