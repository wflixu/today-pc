import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Store } from "redux";


const Root: React.SFC = () => {
    return (
        <h2>hell0 react ts</h2>
    );
};



ReactDOM.render(<Root  />,
    document.getElementById('root') as HTMLElement);