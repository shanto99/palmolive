import React from "react";

import Loader from "react-loader-spinner";

class PalmoliveLoader extends React.Component {
    render() {
        return (
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        );
    }
}

export default PalmoliveLoader;
