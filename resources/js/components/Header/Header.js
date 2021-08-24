import axios from "axios";
import React from "react";
import swal from "sweetalert";
import UserManager from "../../API/UserManagement";

import Modal from "../Modal/Modal";

// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

import "./header.css";

class Header extends React.Component {
    constructor(props)
    {
        super(props);
        this.isFirstClick = true;
        this.dropdownToggler = React.createRef();
        this.currentPasswordRef = React.createRef();
        this.newPasswordRef = React.createRef();
        this.state = {
            user: null,
            isModalOpen: false,
            userName: ''
        }

        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.updatePassword = this.updatePassword.bind(this);

    }
    componentDidMount()
    {
      axios.get('/palmolive/auth-user').then(res => {
          this.setState({
              user: res.data,
              userName: res.data.UserName
          });
      })  
    }


    modalOpen()
    {
        this.setState({
            isModalOpen: true
        });
    }

    modalClose()
    {
        this.setState({
            isModalOpen: false
        });
    }

    updatePassword(e)
    {
        e.preventDefault();
        let currentPassword = this.currentPasswordRef.current.value;
        let newPassword = this.newPasswordRef.current.value;

        UserManager.updatePassword(this.state.user.UserID, currentPassword, newPassword).then((res) => {
            swal("Updated!", res.msg, "success");
        }).catch(err => {
            swal("Error!!", err.msg, "error");
        });
    }

    render() {
        console.log(this.state.isModalOpen);
        return (
            <div className="header">
                <div className="logo-container">
                    <a href="#" className="logo" style={{margin: '3px 0 0'}}>
                        <img src={window.location.origin+'/palmolive/img/logo.jpg'} width="200" height="50" alt="rcca" />
                    </a>
                    <div className="d-md-none toggle-sidebar-left" data-toggle-class="sidebar-left-opened" data-target="html" data-fire-event="sidebar-left-opened">
                        <i className="fas fa-bars" aria-label="Toggle sidebar"/>
                    </div>
                </div>

                <div className="header-right">
                    <span className="separator"/>
                    <span className="separator"/>
                    {/*<Popup trigger={<button className=""> Trigger</button>} position="bottom left">*/}
                    {/*    <div>Popup content here !!</div>*/}
                    {/*</Popup>*/}
                    <div id="userbox" className="userbox">
                        {/*<a href="#" data-toggle="dropdown">*/}
                        {/*    <figure className="profile-picture">*/}
                        {/*        <img src="#" alt="Joseph Doe" className="rounded-circle" data-lock-picture="img/!logged-user.jpg" />*/}
                        {/*    </figure>*/}
                        {/*    <div className="profile-info" data-lock-name="John Doe" data-lock-email="johndoe@okler.com">*/}
                        {/*        <span className="name">Jhon doe</span>*/}
                        {/*        <span className="role">Software engineer</span>*/}
                        {/*    </div>*/}

                        {/*    <i className="fa custom-caret"/>*/}
                        {/*</a>*/}

                        {/*<div className="dropdown-menu">*/}
                        {/*    <ul className="list-unstyled mb-2">*/}
                        {/*        <li className="divider"/>*/}
                        {/*        <li>*/}
                        {/*            <a role="menuitem" tabIndex="-1" href="#"><i className="bx bx-user-circle"/> My Profile</a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a role="menuitem" tabIndex="-1" href="#" data-lock-screen="true"><i className="bx bx-lock"/> Lock Screen</a>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <a role="menuitem" tabIndex="-1" href="#"><i className="bx bx-power-off"/> Logout</a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        <div className="dropdown user-dropdown">
                            <span className="dropdown-toggle" ref={this.dropdownToggler} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true">
                                <span className="user-icon">
                                    <i className="fa fa-user"/>
                                </span>
                            </span>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#" onClick={this.modalOpen}>
                                    Password reset
                                </a>
                                <a className="dropdown-item" href="/palmolive/logout">Logout</a>
                            </div>
                        </div>

                        <span>{this.state.userName}</span>
                        
                    </div>
                </div>
                {
                    this.state.isModalOpen 
                        ? <Modal closeCb={this.modalClose}>
                            <div>
                                <form onSubmit={this.updatePassword}>
                                    <div className="form-group">
                                        <label htmlFor="currentPassword">Current password</label>
                                        <input type="text" className="form-control" ref={this.currentPasswordRef}
                                        id="currentPassword" placeholder="Current password"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="newPassword">New password</label>
                                        <input type="text" className="form-control" ref={this.newPasswordRef}
                                        id="newPassword" placeholder="New password"/>
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-warning">Submit</button>
                                </form>
                            </div>
                        </Modal>
                        : null

                }

                

            </div>

        );
    }
}

export default Header;
