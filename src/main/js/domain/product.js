import {Paginator} from "../component/paginator";

import $ from 'jquery';

const React = require('react');
const ReactDOM = require('react-dom');

export class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.handlePrepareUpdate = this.handlePrepareUpdate.bind(this);
		this.handlePrepareCreate = this.handlePrepareCreate.bind(this);
		this.editProductRef = React.createRef();
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

	handlePrepareUpdate(product) {
		let editDialog = this.editProductRef.current;
		editDialog.prepareUpdate(product);
	}

	handlePrepareCreate() {
		let editDialog = this.editProductRef.current;
		editDialog.prepareCreate();
	}


	render() {
		const products = this.props.products.map(product =>
			<ProductRow key={product.entity._links.self.href}
									product={product}
									attributes={this.props.attributes}
									onDelete={this.props.onDelete}
									// onUpdate={this.props.onUpdate}
									handlePrepareUpdate={this.handlePrepareUpdate}
			/>
		);

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

				<button type="button" className="btn btn-primary" onClick={this.handlePrepareCreate}>
					<i className="fa fa-plus" /> Create Product
				</button>

				<EditProductDialog ref={this.editProductRef}
													 attributes={this.props.attributes}
													 onCreate={this.props.onCreate}
														 // dialogId={createDialog}
													 onUpdate={this.props.onUpdate}
													 product={null}
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
		this.showUpdate = this.showUpdate.bind(this);
	}

	handleDelete() {
		if (confirm("Delete " + this.props.product.entity.name + "?")) {
			this.props.onDelete(this.props.product);
		}
	}

	showUpdate() {
		this.props.handlePrepareUpdate(this.props.product);
	}

	render() {
		let entity = this.props.product.entity;

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

						{/*<button type="button" className="btn btn-primary" onClick={() => this.showUpdate()}>*/}
						<button type="button" className="btn btn-primary" onClick={this.showUpdate}>
							<i className="fa fa-edit" /> Update
						</button>
					</div>
				</td>
			</tr>
		)
	}
}


export class EditProductDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.prepareUpdate = this.prepareUpdate.bind(this);
		this.prepareCreate = this.prepareCreate.bind(this);

		this.state = {product: null};
	}

	prepareUpdate(product) {
		this.setState({product: product});
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = product.entity[attribute].trim();
		});

		$('#productDialog').modal('show');
	}

	prepareCreate() {
		this.setState({product: null});

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		$('#productDialog').modal('show');
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.product) {
			// do update
			const product = {};

			this.props.attributes.forEach(attribute => {
				product[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
			});
			this.props.onUpdate(this.state.product, product);

		} else {
			// do create
			const product = {};

			this.props.attributes.forEach(attribute => {
				product[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
			});
			this.props.onCreate(product);

		}

		$('#productDialog').modal('hide');
	}

	render() {
		return (
			<div>
				<div id="productDialog" className="modal fade" tabIndex="-1" role="dialog">
				{/*<div id={this.props.dialogId}>*/}
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{this.state.product ? "Update" : "Create"} product</h5>
								<button type="button" className="close" data-dismiss="modal">
									<span>&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form>
									{/*<input type="hidden" ref="id" />*/}
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
								<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>
									<i className="fa fa-save" />
									{this.state.product ? " Update" : " Create"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
