import React from "react";

class PageHeader extends React.Component {
    render() {
        let pageTitle = this.props.title || "Dashboard";
        return (
            <header className="page-header">
                <h2>{pageTitle}</h2>
            </header>
        )
    }
}

export default PageHeader;
