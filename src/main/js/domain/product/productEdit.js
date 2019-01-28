import $ from "jquery";

const React = require('react');
const ReactDOM = require('react-dom');

export class ProductEdit extends React.Component {

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
												{this.state.product ? null : <option value="" disabled>&nbsp;</option>}
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
									<i className="fa fa-save"/>
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
