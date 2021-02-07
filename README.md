# Game of Life / React
Conway's Game of Life written in React and Typescript.

[Demo](http://161.35.55.69/game-of-life)

![_GOF](https://user-images.githubusercontent.com/78653736/107159768-712f5080-6992-11eb-8c9c-801d12fc26bf.gif)

Additional dependencies:
- create-react-app
- lodash
- random-js

Tests are written using Testing Library React / Jest.


## Installation
`git clone https://github.com/ozrix84/game-of-life.git`

`npm i`

**Development mode**

`npm start`

**Production build**

`npm run-script build`

`serve -s build` (Preview the production build)

**Run tests**

`npm run-script test`


## Rules
- If there are less than two organisms of one type surrounding one of the same type, then it will die due to isolation.
- If there are two or three organisms of the same type living in the elements surrounding an organism of the same type, then it may survive.
- If there are four or more organisms of one type surrounding one of the same type, then it will die due to overcrowding.
- If there are exactly three organisms of one type surrounding one element, they may give birth into that cell. The new organism is the same type as its parents.
  - If this condition is true for more than one species on the same element then species type for the new element is chosen randomly.
