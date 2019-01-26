const React = require('react');
const ReactDOM = require('react-dom');

export class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavPage = this.handleNavPage.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleNavFirst(e) {
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

	handleNavPage(e) {
		e.preventDefault();

		const page = e.target.dataset.page;
		this.props.onNavigate(this.props.links.self.href + "?size=" + this.props.pageSize + "&page=" + page + "&sort=")
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
			<Product key={product._links.self.href} product={product} onDelete={this.props.onDelete}/>
		);

		// if ("first" in this.props.links) {
		// 	navLinks.push();
		// }
		// if ("prev" in this.props.links) {
		// 	navLinks.push(<button type="button" className="btn btn-sm" disabled={"prev" in this.props.links ? null : true} key="prev" onClick={this.handleNavPrev}><i className="fa fa-step-backward" /> Prev</button>);
		// }
		// if ("next" in this.props.links) {
		// 	navLinks.push(<button type="button" className="btn btn-sm" disabled={"next" in this.props.links ? null : true} key="next" onClick={this.handleNavNext}>Next <i className="fa fa-step-forward" /></button>);
		// }
		// if ("last" in this.props.links) {
		// 	navLinks.push(<button type="button" className="btn btn-sm" disabled={"last" in this.props.links ? null : true} key="last" onClick={this.handleNavLast}>Last <i className="fa fa-fast-forward" /></button>);
		// }

		const pageLinks = [];
		let totalPages = this.props.page.totalPages;
		let currentPage = this.props.page.number;

		if (totalPages < 10) {
			for (let i = 0; i < totalPages; i++) {
				pageLinks.push(<li className={"page-item" + (i === currentPage ? " active" : "")} key={"page" + i}>
					<a className="page-link" data-page={i} onClick={this.handleNavPage}>{i + 1}</a>
				</li>);
			}
		} else {
			// if (currentPage > 4) {
				for (let i = 0; i < 3; i++) {
					pageLinks.push(<li className={"page-item" + (i === currentPage ? " active" : "")} key={"page" + i}>
						<a className="page-link" data-page={i} onClick={this.handleNavPage}>{i + 1}</a>
					</li>);
				}
			// }

			if (currentPage > 5) {
				pageLinks.push(<li className="page-item" key={"page_gap1"}>
					<a className="page-link">...</a>
				</li>);
			}

			const start = Math.max(3, currentPage - 2);
			const stop = Math.min(totalPages - 3, currentPage + 3);

			for (let i = start; i < stop; i++) {
				pageLinks.push(<li className={"page-item" + (i === currentPage ? " active" : "")} key={"page" + i}>
					<a className="page-link" data-page={i} onClick={this.handleNavPage}>{i + 1}</a>
				</li>);
			}

			if (currentPage < totalPages - 6) {
				pageLinks.push(<li className="page-item" key={"page_gap2"}>
					<a className="page-link">...</a>
				</li>);
			}

			// if (currentPage < totalPages - 3) {

				for (let i = totalPages - 3; i < totalPages; i++) {
					pageLinks.push(<li className={"page-item" + (i === currentPage ? " active" : "")} key={"page" + i}>
						<a className="page-link" data-page={i} onClick={this.handleNavPage}>{i + 1}</a>
					</li>);
				}
			// }


		}

		return (
			<div className="container">
				<label htmlFor="pageSize">Page size</label>
				<input id="pageSize" type="number" ref="pageSize" defaultValue={this.props.pageSize}
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
				<div>
					<ul className="pagination justify-content-center">
						<li className={"page-item" + ("prev" in this.props.links ? "" : " disabled")}>
							<a className="page-link" onClick={this.handleNavPrev}><i className="fa fa-step-backward"/> Prev</a>
						</li>
						{pageLinks}
						<li className={"page-item" + ("next" in this.props.links ? "" : " disabled")}>
							<a className="page-link" onClick={this.handleNavNext}>Next <i className="fa fa-step-forward"/></a>
						</li>
					</ul>

				</div>
			</div>
		);
	}
}

export class Product extends React.Component {
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


export class CreateProduct extends React.Component {
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
			// {/*<p key={attribute}>*/}
			// 	{/*<input type="text" placeholder={attribute} ref={attribute} className="field"/>*/}
			// {/*</p>*/}
		// const inputs = this.props.attributes.map(attribute =>
		//
		// 	<div className="row" key={attribute}>
		// 		<label htmlFor={attribute} className="col-sm-2 col-form-label">{attribute}</label>
		// 		<div className="col-sm-3">
		// 			<input type="text" className="form-control" ref={attribute} id={attribute}/>
		// 		</div>
		// 	</div>
		// );

		return (
			<div>
				{/*<a href="#createProduct">Create</a>*/}
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createProduct">
					Create Product
				</button>

				<div id="createProduct" className="modal fade" tabIndex="-1" role="dialog">
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
										<div className="col-sm-3">
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
