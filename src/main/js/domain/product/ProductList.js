import {Paginator} from "../../component/paginator";
import {ProductEdit} from "./ProductEdit";

const React = require('react');
const ReactDOM = require('react-dom');

export class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleInput = this.handleInput.bind(this);
		this.showUpdate = this.showUpdate.bind(this);
		this.showCreate = this.showCreate.bind(this);
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

	showUpdate(product) {
		let editDialog = this.editProductRef.current;
		editDialog.prepareUpdate(product);
	}

	showCreate() {
		let editDialog = this.editProductRef.current;
		editDialog.prepareCreate();
	}


	render() {
		return (
			<div>
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
					{this.props.products.map(product =>
						<ProductRow key={product.entity._links.self.href}
												product={product}
												attributes={this.props.attributes}
												onDelete={this.props.onDelete}
												showUpdate={this.showUpdate}
						/>
					)}
					</tbody>
				</table>

				<button type="button" className="btn btn-primary" onClick={this.showCreate}>
					<i className="fa fa-plus"/> Create Product
				</button>

				<ProductEdit ref={this.editProductRef}
										 attributes={this.props.attributes}
										 onCreate={this.props.onCreate}
										 onUpdate={this.props.onUpdate}
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
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleDelete() {
		if (confirm("Delete " + this.props.product.entity.name + "?")) {
			this.props.onDelete(this.props.product);
		}
	}

	handleUpdate() {
		this.props.showUpdate(this.props.product);
	}

	render() {
		let entity = this.props.product.entity;

		return (
			<tr>
				<td>{entity.name}</td>
				<td>{entity.measureUnit}</td>
				<td>{entity.category}</td>
				<td>

					{/*<div className="btn-group btn-group-sm">*/}
						<button type="button" className="btn btn-danger btn-sm" onClick={this.handleDelete}>
							<i className="fa fa-trash-alt" /> Delete
						</button>
					{" "}
						<button type="button" className="btn btn-primary btn-sm" onClick={this.handleUpdate}>
							<i className="fa fa-edit" /> Update
						</button>
					{/*</div>*/}
				</td>
			</tr>
		)
	}
}
