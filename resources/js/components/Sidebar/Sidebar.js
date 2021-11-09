import React from "react";
import {Link} from "react-router-dom";

import UserManagement from "../../API/UserManagement";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: []
        }
    }
    componentDidMount() {
        UserManagement.getUserMenus((menus) => {
            let userMenus = menus.map(menu => {
               return menu.MenuID;
            });

            this.setState({
                menus: userMenus
            });
        });
    }

    render() {
        let menus = this.state.menus;
        return (
                <aside id="sidebar-left" className="sidebar-left">
                    <div className="sidebar-header">
                        <div className="sidebar-title">
                            Navigation
                        </div>
                        <div className="sidebar-toggle d-none d-md-block" data-toggle-class="sidebar-left-collapsed" data-target="html" data-fire-event="sidebar-left-toggle">
                            <i className="fas fa-bars" aria-label="Toggle sidebar"/>
                        </div>
                    </div>
                        <div className="">
                            <div className="nano-content">
                                <nav id="menu" className="nav-main" role="navigation">
                                    <ul className="nav nav-main">
                                        <li>
                                            <Link className="nav-link" to="/">
                                                <i className="bx bxs-dashboard" aria-hidden="true"/>
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        {menus.indexOf(1) >= 0
                                        ? <li>
                                            <Link to="/create-user">
                                                <i className="bx bxs-user" aria-hidden="true"/>
                                                <span>User manager</span>
                                            </Link>
                                        </li>
                                        : null}
                                        {menus.indexOf(4) >= 0
                                        ? <li>
                                                <Link to="/input-heads">
                                                    <i className="bx bxs-data" aria-hidden="true"/>
                                                    <span>Inputs</span>
                                                </Link>
                                          </li>
                                        : null}

                                        {menus.indexOf(5) >= 0
                                        ? <li>
                                                <Link to="/input-heads-goal">
                                                    <i className="bx bxs-data" aria-hidden="true"/>
                                                    <span>Goals input</span>
                                                </Link>
                                          </li>
                                        : null}

                                        <li>
                                            <Link to="/detail-report">
                                                <i className="bx bxs-data" aria-hidden="true"/>
                                                <span>Detail report</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/raw-report">
                                                <i className="bx bxs-data" aria-hidden="true"/>
                                                <span>Raw report</span>
                                            </Link>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                </aside>
        );
    }
}

export default Sidebar;
