'use strict';

import {Product} from "./domain/product/product";
import {NavBar} from "./domain/navbar/navbar";

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

	render() {
		return (
			<div className="container">
				<NavBar />
				<Product />
			</div>
		);
	}

}

ReactDOM.render(
	<App />,
	document.getElementById('react')
);


