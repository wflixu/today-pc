import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Store } from "redux";
import App from './App';

const Root: React.SFC = () => {
    return (
       <App/>
    );
};

ReactDOM.render(<Root  />,
    document.getElementById('root') as HTMLElement);