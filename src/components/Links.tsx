import React from "react";
import react from "../images/react.png";
import github from "../images/github.png";

function Links() {
	return <>
		<div className="links">
			<a className="react" href="https://reactjs.org/">
				<img width="20" src={react} alt="Go to the project page at Github" />
			</a>
			<a className="github" href="https://github.com/ozrix84/game-of-life">
				<img width="60" src={github} alt="Go to the React homepage" />
			</a>
		</div>
	</>
}

export default Links;
