const React = require('react');

export class Paginator extends React.Component {
	constructor(props) {
		super(props);
		// this.handleNavFirst = this.handleNavFirst.bind(this);
		// this.handleNavLast = this.handleNavLast.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavPage = this.handleNavPage.bind(this);
	}

	// handleNavFirst(e) {
	// 	e.preventDefault();
	// 	this.props.onNavigate(this.props.links.first.href);
	// }

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	// handleNavLast(e) {
	// 	e.preventDefault();
	// 	this.props.onNavigate(this.props.links.last.href);
	// }

	handleNavPage(e) {
		e.preventDefault();

		const page = e.target.dataset.page;
		this.props.onNavigate(this.props.links.self.href + "?size=" + this.props.page.size + "&page=" + page)
	}


	render() {
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
			for (let i = 0; i < 3; i++) {
				pageLinks.push(<li className={"page-item" + (i === currentPage ? " active" : "")} key={"page" + i}>
					<a className="page-link" data-page={i} onClick={this.handleNavPage}>{i + 1}</a>
				</li>);
			}

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

			for (let i = totalPages - 3; i < totalPages; i++) {
				pageLinks.push(<li className={"page-item" + (i === currentPage ? " active" : "")} key={"page" + i}>
					<a className="page-link" data-page={i} onClick={this.handleNavPage}>{i + 1}</a>
				</li>);
			}

		}

		return (
			<div>
				<ul className="pagination justify-content-center">
					<li className={"page-item" + ("prev" in this.props.links ? "" : " disabled")}>
						<a className="page-link" onClick={this.handleNavPrev}><i className="fa fa-chevron-left"/> Prev</a>
					</li>
					{pageLinks}
					<li className={"page-item" + ("next" in this.props.links ? "" : " disabled")}>
						<a className="page-link" onClick={this.handleNavNext}>Next <i className="fa fa-chevron-right"/></a>
					</li>
				</ul>
			</div>
		);
	}
}
