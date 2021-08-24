import React from "react";

import UserManager from "../../../API/UserManagement";

class CreateUser extends React.Component {
    constructor(props)
    {
        super(props);
        this.nameRef = React.createRef();
        this.menuRef = React.createRef();
        this.designationRef = React.createRef();
        this.emailRef = React.createRef();
        this.userNameRef = React.createRef();
        this.passwordRef = React.createRef();

        this.searchUserTimeout = null;
        this.filterUserTimeout = null;

        this.state = {
            users: [],
            allUsers: [],
            filteredUsers: [],
            menus: [],
            updatingUser: null,
            name: '',
            email: '',
            designation: '',
            userName: '',
            password: '',
            userMenus: []
        };

        this.createUser = this.createUser.bind(this);
        this.checkAndGetAlreadyExistedUser = this.checkAndGetAlreadyExistedUser.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleMenuChange = this.handleMenuChange.bind(this);

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleDesignationChange = this.handleDesignationChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.editUser = this.editUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.filterUser = this.filterUser.bind(this);
        this.handleOnlyReportPermission = this.handleOnlyReportPermission.bind(this);

    }

    componentDidMount()
    {
        UserManager.getMenus((menus) => {
            this.setState({
                menus: menus
            });
        });

        this.getAllUsers();


    }

    getAllUsers()
    {
        UserManager.getAllUsers((users) => {
            let mappedUsers = {};
            users.forEach(user => {
                mappedUsers[user.UserName] = user;
            });
            this.setState({
                users: mappedUsers,
                allUsers: users,
                filteredUsers: users,
                name: '',
                email: '',
                designation: '',
                userMenus: [],
                password: '',
                updatingUser: null,
                userName: ''
            });
        });
    }

    createUser(e) {
        e.preventDefault();

        let {name, email, userName, designation, password, userMenus} = this.state;

        UserManager.createUser({name, email, designation, userName, userMenus, password}, () => {
            this.getAllUsers();
        });

    }

    checkAndGetAlreadyExistedUser(userName)
    {
        if(this.state.users[userName]) {
            let foundUser = this.state.users[userName];
            this.setState({
                updatingUser: this.state.users[userName],
                name: foundUser.Name,
                userName: foundUser.UserName,
                email: foundUser.Email || "",
                designation: foundUser.Designation,
                password: foundUser.Password,
                userMenus: foundUser.menus.map(menu => menu.MenuID)
            });
        }
    }

    handleNameChange(e)
    {
        this.setState({
            name: e.target.value
        })
    }

    handleEmailChange(e)
    {
        this.setState({
            email: e.target.value
        })
    }

    handleDesignationChange(e)
    {
        this.setState({
            designation: e.target.value
        })
    }

    handlePasswordChange(e)
    {
        this.setState({
           password: e.target.value
        });
    }

    handleMenuChange(e)
    {
        let menuId = Number(e.target.value);
        this.setState((preState) => {
            let previousState = {...preState};
            let userMenus = previousState.userMenus;
            if(userMenus.includes(menuId)) {
                userMenus = userMenus.filter(menu => menu !== menuId);
            } else {
                userMenus.push(menuId);
            }

            previousState.userMenus = userMenus;

            return previousState;
        });


    }

    handleOnlyReportPermission(e)
    {
        let target = e.target;
        if(target.checked) {
            this.setState({
                userMenus: []
            });
        }
    }

    handleUserNameChange(e)
    {
        let value = e.target.value;

        if(this.searchUserTimeout) clearTimeout(this.searchUserTimeout);
        this.searchUserTimeout = setTimeout(() => {
            this.checkAndGetAlreadyExistedUser(value);
        }, 500);

        this.setState({
            userName: value
        })
    }

    editUser(userName)
    {
        this.checkAndGetAlreadyExistedUser(userName);
    }

    filterUser(searchKey)
    {
        let result = this.state.allUsers.filter(user => user.Name.includes(searchKey));
        this.setState({
            filteredUsers: result
        });
    }

    searchUser(e)
    {
        let searchKey = e.target.value;
        if(this.filterUserTimeout) clearTimeout(this.filterUserTimeout);
        this.filterUserTimeout = setTimeout(() => {
            this.filterUser(searchKey);
        }, 300);
    }

    render() {
        let {name, userName, email, password, designation, userMenus} = this.state;
        return (
            <React.Fragment>
                <header className="page-header">
                    <h2>User manager</h2>
                </header>
                <div className="row">
                    <div className="col-lg-6">
                        <form id="form" action="#" onSubmit={this.createUser} className="form-horizontal">
                            <section className="card">
                                <header className="card-header">
                                    <h2 className="card-title">Create user</h2>
                                    <p className="card-subtitle">
                                        Create a user with menu access
                                    </p>
                                </header>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="user-full-name-input" className="col-sm-3 control-label text-sm-right pt-2">Full Name <span className="required">*</span></label>
                                        <div className="col-sm-9">
                                            <input ref={this.nameRef} value={name} type="text" id="user-full-name-input" name="Name"
                                                   onChange={this.handleNameChange} className="form-control" placeholder="user name" required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor= "user-email-input" className="col-sm-3 control-label text-sm-right pt-2">Email <span className="required">*</span></label>
                                        <div className="col-sm-9">
                                            <div className="input-group">
                                                        <span className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                <i className="fas fa-envelope"></i>
                                                            </span>
                                                        </span>
                                                <input ref = {this.emailRef}  id="user-email-input" value={email} type="email" onChange={this.handleEmailChange}
                                                       name="Email" className="form-control" placeholder="user email" required/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="user-name-input" className="col-sm-3 control-label text-sm-right pt-2">User name</label>
                                        <div className="col-sm-9">
                                            <input ref = {this.userNameRef} id="user-name-input" value={userName} type="text" onChange={this.handleUserNameChange}
                                                   name="UserName" className="form-control" placeholder="user name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="user-password-input" className="col-sm-3 control-label text-sm-right pt-2">Password</label>
                                        <div className="col-sm-9">
                                            <input ref = {this.passwordRef} id="user-password-input" value={password} type="text" name="Password"  onChange={this.handlePasswordChange}
                                                   className="form-control" placeholder="user password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="user-designation-input" className="col-sm-3 control-label text-sm-right pt-2">Designation</label>
                                        <div className="col-sm-9">
                                            <input ref = {this.designationRef} id="user-designation-input" value={designation} type="text"  onChange={this.handleDesignationChange}
                                                   name="Designation" className="form-control" placeholder="designation" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-sm-3 control-label text-sm-right pt-2">Menu access <span className="required">*</span></label>
                                        <div ref={this.menuRef} className="col-sm-9">
                                            {this.state.menus.map((menu) => {
                                                return (
                                                    <div key={menu.MenuID} className="checkbox-custom chekbox-primary">
                                                        <input id={`for-menu-${menu.MenuID}`} checked={userMenus.includes(menu.MenuID)} onChange={this.handleMenuChange}
                                                               value={menu.MenuID} type="checkbox" name="for[]" />
                                                        <label htmlFor={`for-menu-${menu.MenuID}`}>{menu.MenuName}</label>
                                                    </div>
                                                )
                                            })}

                                            <div className="checkbox-custom chekbox-primary">
                                                <input id="only-report-permission" checked={userMenus.length < 1} onChange={this.handleOnlyReportPermission}
                                                         type="checkbox" />
                                                <label htmlFor="only-report-permission">Only dashboard</label>
                                            </div>

                                            <label className="error"/>
                                        </div>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <div className="row justify-content-end">
                                        <div className="col-sm-9">
                                            <button className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </footer>
                            </section>
                        </form>
                    </div>
                    <div className="col-lg-6 table-responsive" style={{height: '60vh'}}>
                        <div className="form-group" style={{width: '200px'}}>
                            <input type="text" className="form-control" placeholder="search user" onKeyUp={this.searchUser}/>
                        </div>
                        <br/>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{backgroundColor: 'grey'}}>Name</th>
                                    <th style={{backgroundColor: 'grey'}}>Designation</th>
                                    <th style={{backgroundColor: 'grey'}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                              {this.state.filteredUsers.map(user => {
                                  return (
                                      <tr key={user.UserName}>
                                          <td>{user.Name}</td>
                                          <td>{user.Designation}</td>
                                          <td>
                                              <button className="btn btn-warning" onClick={() => this.editUser(user.UserName)}>Edit</button>
                                          </td>
                                      </tr>
                                  )
                              })}  
                            </tbody>
                        </table>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

 export default CreateUser;
