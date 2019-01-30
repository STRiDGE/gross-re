'use strict';

import {Product} from "./domain/product/Product";
import {NavBar} from "./domain/navbar/NavBar";
import {Home} from "./domain/home/Home";

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { section: "Product" };
		this.changeSection = this.changeSection.bind(this);
	}

	changeSection(sectionName) {
		this.setState({section: sectionName});
	}

	render() {

		let activeItem;

		if (this.state.section === "Home") {
			activeItem = <Home />;
		} else if (this.state.section === "Product") {
			activeItem = <Product />;
		} else {
			activeItem = <div>Unknown {this.state.section}</div>;
		}

		return (
			<div className="container">
				<NavBar changeSection={this.changeSection}/>
				{activeItem}
			</div>
		);
	}

}

ReactDOM.render(
	<App/>,
	document.getElementById('react')
);


