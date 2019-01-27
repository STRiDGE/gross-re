import {Paginator} from "../component/paginator";

import $ from 'jquery';

const React = require('react');
const ReactDOM = require('react-dom');

function getId(object) {
	let leaf = object;

	if ("entity" in leaf) {
		leaf = leaf.entity;
	}

	if ("_links" in leaf) {
		leaf = leaf._links;
	}

	if ("self" in leaf) {
		leaf = leaf.self;
	}

	let url = leaf.href;

	if (url.indexOf('api/') > -1) {
		url = url.split('api/')[1];
	}

	url = url.replace(/\//g, '_');

	return url;
}

export class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
		}
	}



	render() {
		const products = this.props.products.map(product =>
			<ProductRow key={product.entity._links.self.href}
									product={product}
									attributes={this.props.attributes}
									onDelete={this.props.onDelete}
									onUpdate={this.props.onUpdate}
			/>
		);

		const createDialog = "createProduct";

		return (
			<div className="container">
				{/*<label htmlFor="pageSize">Page size</label>*/}
				<input id="pageSize" type="hidden" ref="pageSize" defaultValue={this.props.pageSize}
							 onInput={this.handleInput}/>
				<table className="table table-hover">
					<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Unit</th>
						<th scope="col">Category</th>
						<th scope="col">&nbsp;</th>
					</tr>
					</thead>
					<tbody>
					{products}
					</tbody>
				</table>

				<button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + createDialog}>
					<i className="fa fa-plus" /> Create Product
				</button>

				<CreateProductDialog attributes={this.props.attributes}
														 onCreate={this.props.onCreate}
														 dialogId={createDialog}
				/>

				<Paginator
					onNavigate={this.props.onNavigate}
					page={this.props.page}
					links={this.props.links}
				/>
			</div>
		);
	}
}

export class ProductRow extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.product);
	}

	render() {
		let entity = this.props.product.entity;

		const dialogId = "updateProduct-" + getId(entity);

		return (
			<tr>
				<td>{entity.name}</td>
				<td>{entity.measureUnit}</td>
				<td>{entity.category}</td>
				<td>

					<div className="btn-group btn-group-sm">
						<button type="button" onClick={this.handleDelete} className="btn btn-danger">
							<i className="fa fa-trash-alt" /> Delete
						</button>

						<button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + dialogId}>
							<i className="fa fa-edit" /> Update
						</button>
					</div>

					<UpdateProductDialog product={this.props.product}
															 attributes={this.props.attributes}
															 onUpdate={this.props.onUpdate}
															 dialogId={dialogId}
												 />
				</td>
			</tr>
		)
	}
}


export class CreateProductDialog extends React.Component {
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
		return (
			<div>
				<div id={this.props.dialogId} className="modal fade" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Create product</h5>
								<button type="button" className="close" data-dismiss="modal">
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group row">
										<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
										<div className="col-sm-6">
											<input type="text" className="form-control" ref="name" id="name"/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
										<div className="col-sm-3">
											<select className="form-control" ref="measureUnit" id="unit">
												<option></option>
												<option value="GRAM">g</option>
												<option value="KILOGRAM">kg</option>
												<option value="LITRE">l</option>
												<option value="COUNT">count</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
										<div className="col-sm-3">
											<input type="text" className="form-control" ref="category" id="category"/>
										</div>
									</div>

								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn" data-dismiss="modal">Cancel</button>
								<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Create</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export class UpdateProductDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log("Updating ", this.props.product);

		const updatedProduct = {};

		this.props.attributes.forEach(attribute => {
			updatedProduct[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onUpdate(this.props.product, updatedProduct);

		// Navigate away from the dialog to hide it.
		// window.location = "#";
		$('#' + this.props.dialogId).modal('hide');
	}

	render() {

		const entity = this.props.product.entity;
		// const dialogId = "updateProduct-" + getId(entity);

		return (
			<span>
				<div id={this.props.dialogId} className="modal fade" tabIndex="-1" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Update product</h5>
								<button type="button" className="close" data-dismiss="modal">
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group row">
										<label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
										<div className="col-sm-6">
											<input type="text" className="form-control" ref="name" id="name" defaultValue={entity.name}/>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="unit" className="col-sm-2 col-form-label">Unit</label>
										<div className="col-sm-3">
											<select className="form-control" ref="measureUnit" id="unit" defaultValue={entity.measureUnit}>
												<option></option>
												<option value="GRAM">g</option>
												<option value="KILOGRAM">kg</option>
												<option value="LITRE">l</option>
												<option value="COUNT">count</option>
											</select>
										</div>
									</div>

									<div className="form-group row">
										<label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
										<div className="col-sm-3">
											<input type="text" className="form-control" ref="category" id="category" defaultValue={entity.category}/>
										</div>
									</div>

								</form>

							</div>
							<div className="modal-footer">
								<button type="button" className="btn" data-dismiss="modal">Cancel</button>
								<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Update</button>
							</div>
						</div>
					</div>
				</div>
			</span>
		)
	}
}
