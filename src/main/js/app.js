'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

const follow = require('./follow');

var root = '/api';

class App extends React.Component {

	constructor(props) {
		console.log("App constructor");
		super(props);
		this.state = {products: [], attributes: [], pageSize: 5, links: {}};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
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
			});
		});
	}

	onCreate(newProduct) {
		follow(client, root, ['products']).then(productCollection => {
			return client({
				method: 'POST',
				path: productCollection.entity._links.self.href,
				entity: newProduct,
				headers: {'Content-Type': 'application/json'}
			});
		}).then(response => {
			return follow(client, root, [
				{rel: 'products', params: {'size': this.state.pageSize}}
			]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(productCollection => {
			this.setState({
				products: productCollection.entity._embedded.products,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: productCollection.entity._links
			});
		});
	}

	onDelete(product) {
		client({method: 'DELETE', path: product._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	render() {
		return (
			<div>
				<CreateProduct attributes={this.state.attributes} onCreate={this.onCreate} />
				<ProductList products={this.state.products}
							 links={this.state.links}
							 pageSize={this.state.pageSize}
							 onNavigate={this.onNavigate}
							 onDelete={this.onDelete}
							 updatePageSize={this.updatePageSize}
				/>
			</div>
		);
	}
}

class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleNavFirst(e){
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}

	render() {
		const products = this.props.products.map(product =>
			<Product key={product._links.self.href} product={product} />
		);

		const navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt; First</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt; Prev</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>Next &gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>Last &gt;&gt;</button>);
		}

		return (
			<div>
				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput} />
				<table>
					<tbody>
						<tr>
							<th>Name</th>
							<th>Unit</th>
							<th>Category</th>
							<th>&nbsp;</th>
						</tr>
						{products}
					</tbody>
				</table>
				<div>
					{navLinks}
				</div>
			</div>
		);
	}
}

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.product);
	}

	render() {
		return (
			<tr>
				<td>{this.props.product.name}</td>
				<td>{this.props.product.measureUnit}</td>
				<td>{this.props.product.category}</td>
				<td>
					<button onClick={this.handleDelete}>Delete</button>
				</td>
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

