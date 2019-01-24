'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const follow = require('./follow');

var root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {products: []};
	}

	componentDidMount() {
		// client({method: 'GET', path: '/api/products'}).done(
		// 	response => {
		// 		this.setState({products: response.entity._embedded.products})
		// 	}
		// );
		this.loadFromServer(this.state.pageSize);
	}

	loadFromServer(pageSize) {
		follow(
			client, root, [{rel: 'products', params: {size: pageSize}}]
		).then(productCollection => {
			return client({
				method: 'GET',
				path: productCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return productCollection;
			});
		}).done(productCollection => {
			this.setState({
				products: productCollection.entity._embedded.products,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: productCollection.entity._links
			})
		});
	}

	onCreate(newProduct) {
		follow(client, root, ['products']).then(productCollection => {
			return client({
				method: 'POST',
				path: productCollection.entity._links.self.href,
				entity: newProduct,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'products', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	render() {
		console.log("products", this.state.products);
		return (
			<ProductList products={this.state.products}/>
		);
	}
}

class ProductList extends React.Component {
	render() {
		console.log("this.props.products", this.props.products);

		const products = this.props.products.map(product =>
			<Product key={product._links.self.href} product={product} />
		);

		return (
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Unit</th>
						<th>Category</th>
					</tr>
					{products}
				</tbody>
			</table>
		);
	}
}

class Product extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.product.name}</td>
				<td>{this.props.product.measureUnit}</td>
				<td>{this.props.product.category}</td>
			</tr>
		)
	}
}

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		const newProduct = {};

		this.props.attributes.forEach(attribute => {
			newProduct[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newProduct);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		const inputs = this.props.attributes.map(attribute =>
			<p key={attribute}>
				<input type="text" placeholder={attribute} ref={attribute} className="field"/>
			</p>
		);

		return (
			<div>
				<a href="#createProduct">Create</a>

				<div id="createProduct" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new product</h2>
						<form>
							{inputs}
							<button onClick={this.handleSubmit}>Create</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
);


