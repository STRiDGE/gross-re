'use strict';

import {ProductList} from "./domain/product";

import 'bootstrap';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');

const client = require('./client');
const follow = require('./follow');
const stompClient = require('./component/websocket-listener')

const root = '/api';

class App extends React.Component {

	constructor(props) {
		// console.log("App constructor");
		super(props);
		this.state = {products: [], attributes: [], pageSize: 10, links: {}, page: { totalPages: 1, number: 0 } };
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
		this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);
		stompClient.register([
			{ route: '/topic/newProduct', callback: this.refreshAndGoToLastPage},
			{ route: '/topic/updateProduct', callback: this.refreshCurrentPage},
			{ route: '/topic/deleteProduct', callback: this.refreshCurrentPage},
		]);
	}

	loadFromServer(pageSize) {
		follow(
			client, root, [{
				rel: 'products',
				params: {size: pageSize}
			}]
		).then(productCollection => {
			return client({
				method: 'GET',
				path: productCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity,
				this.links = productCollection.entity._links,
				this.page = productCollection.entity.page
				;
				return productCollection;
			});
		}).then(productCollection => {
			return productCollection.entity._embedded.products.map(product =>
					client({
						method: 'GET',
						path: product._links.self.href
					})
			);
		}).then(productPromises => {
			return when.all(productPromises);
		}).done(products => {
			this.setState({
				products: products,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				page: this.page,
				links: this.links
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
		});
		// 	.then(response => {
		// 	return follow(client, root, [
		// 		{rel: 'products', params: {'size': this.state.pageSize}}
		// 	]);
		// }).done(response => {
		// 	if (typeof response.entity._links.last !== "undefined") {
		// 		this.onNavigate(response.entity._links.last.href);
		// 	} else {
		// 		this.onNavigate(response.entity._links.self.href);
		// 	}
		// });
	}

	onUpdate(product, updatedProduct) {
		client({
			method: 'PUT',
			path: product.entity._links.self.href,
			entity: updatedProduct,
			headers: {
				'Content-Type': 'application/json',
				'If-Match': product.headers.Etag
			}
		}).done(response => {
			// this.loadFromServer(this.state.pageSize);
		}, response => {
			if (response.status.code === 412) {
				alert('DENIED: Unable to update ' + product.entity._links.self.href + '. Your copy is stale.');
			}
		})
	}

	onDelete(product) {
		client({method: 'DELETE', path: product.entity._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}

	onNavigate(navUri) {
		console.log("navigating " + navUri);
		client({
			method: 'GET',
			path: navUri
		}).then(productCollection => {
			this.links = productCollection.entity._links;
			this.page = productCollection.entity.page;

			return productCollection.entity._embedded.products.map(product =>
				client({
					method: 'GET',
					path: product._links.self.href
				})
			);
		}).then(productPromises => {
			return when.all(productPromises);
		}).done(products => {
				this.setState({
					products: products,
					attributes: this.state.attributes,
					pageSize: this.state.pageSize,
					page: this.page,
					links: this.links
				});
			});
	}

	refreshAndGoToLastPage(message) {
		follow(client, root, [{
			rel: 'products',
			params: {size: this.state.pageSize}
		}]).done(response => {
			if (response.entity._links.last !== undefined) {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	refreshCurrentPage(message) {
		follow(client, root, [{
			rel: 'products',
			params: {
				size: this.state.pageSize,
				page: this.state.page.number
			}
		}]).then(productCollection => {
			this.links = productCollection.entity._links;
			this.page = productCollection.entity.page;

			return productCollection.entity._embedded.products.map(product => {
				return client({
					method: 'GET',
					path: product._links.self.href

				});
			});
		}).then(productPromises => {
			return when.all(productPromises);
		}).then(products => {
			this.setState({
				page: this.page,
				products: products,
				attributes: Object.keys(this.schema.properties),
				pageSize: this.state.pageSize,
				links: this.links
			})
		})
	}


	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadFromServer(pageSize);
		}
	}

	render() {
		return (
			<ProductList products={this.state.products}
									 links={this.state.links}
									 pageSize={this.state.pageSize}
									 page={this.state.page}
									 attributes={this.state.attributes}
									 onNavigate={this.onNavigate}
									 onCreate={this.onCreate}
									 onUpdate={this.onUpdate}
									 onDelete={this.onDelete}
									 updatePageSize={this.updatePageSize}
			/>
		);
	}
}



ReactDOM.render(
	<App />,
	document.getElementById('react')
);


