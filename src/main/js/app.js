'use strict';

import {CreateProduct, ProductList} from "./domain/product";

import 'bootstrap';

const React = require('react');
const ReactDOM = require('react-dom');

const client = require('./client');
const follow = require('./follow');

const root = '/api';

class App extends React.Component {

	constructor(props) {
		// console.log("App constructor");
		super(props);
		this.state = {products: [], attributes: [], pageSize: 10, links: {}, page: { totalPages: 1, number: 0 } };
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
				page: productCollection.entity.page,
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
		console.log("navigating " + navUri);
		client({method: 'GET', path: navUri})
			.done(productCollection => {
				this.setState({
					products: productCollection.entity._embedded.products,
					attributes: this.state.attributes,
					pageSize: this.state.pageSize,
					page: productCollection.entity.page,
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
				<ProductList products={this.state.products}
							links={this.state.links}
							pageSize={this.state.pageSize}
							page={this.state.page}
							onNavigate={this.onNavigate}
							onDelete={this.onDelete}
							updatePageSize={this.updatePageSize}
				/>

				<CreateProduct attributes={this.state.attributes} onCreate={this.onCreate} />

			</div>
		);
	}
}



ReactDOM.render(
	<App />,
	document.getElementById('react')
);


