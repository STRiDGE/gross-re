const React = require('react');

import 'bootstrap';

export class NavBar extends React.Component {

	constructor(props) {
		super(props);
		this.changeSection = this.changeSection.bind(this);
	}

	changeSection(sectionName, e) {
		e.preventDefault();
		this.props.changeSection(sectionName);
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
								aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<a className="navbar-brand" href="/" onClick={(e) => this.changeSection("Home", e)}>
					<img src="/img/favicon-brand.png" width="43" height="30" className="d-inline-block align-top" />
					{" Gross RE"}
				</a>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<a className="nav-link"><i className="fa fa-compress" /> TODO</a>
						</li>

						<li className="nav-item dropdown">
							<a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-toggle="dropdown">
								<i className="fas fa-tools" /> Admin
							</a>
							<div className="dropdown-menu">
								<a className="nav-link" onClick={(e) => this.changeSection("Product", e)}><i className="fa fa-list" /> Product</a>
								{/*<a className="dropdown-item" href="/site/list"><i className="fas fa-globe-africa"></i> Sites</a>*/}
								{/*<a className="dropdown-item" href="/condition/list"><i*/}
									{/*className="fas fa-briefcase-medical"></i> Conditions</a>*/}
								{/*<a className="dropdown-item" href="/user/list"><i className="fas fa-user-shield"></i> Users</a>*/}
								{/*<div className="dropdown-divider"></div>*/}
								{/*<a className="dropdown-item" href="#">...Watch this space...</a>*/}
							</div>
						</li>

					</ul>
				</div>
			</nav>
		);
	}
}
