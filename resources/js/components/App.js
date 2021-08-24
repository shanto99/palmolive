import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import Header from "./Header/Header";
import PageHeader from "./PageHeader/PageHeader";
import Sidebar from "./Sidebar/Sidebar";
import Routes from "../router";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          pageTitle: "Report"
        };
    }

    render() {
        return (
            <BrowserRouter basename="palmolive">
                <Header/>
                {/*<PageHeader title={this.state.pageTitle}/>*/}
                <div className="inner-wrapper">
                    <Sidebar/>
                    <section role="main" className="content-body">
                        <Routes setPageTitle={this.setPageTitle}/>
                    </section>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
