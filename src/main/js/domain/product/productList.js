import {Paginator} from "../../component/paginator";
import {ProductEdit} from "./productEdit";

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
					<i className="fa fa-plus"/> Create Product
				</button>

				<ProductEdit ref={this.editProductRef}
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

class ProductRow extends React.Component {
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
