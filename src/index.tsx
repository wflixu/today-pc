import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';
// import { configureStore } from './app/store';
// import { Router } from 'react-router';
// import { App } from './app/index';
// import  {Hello}  from './basic/index';
import  {Counter}  from './basic/index';

// prepare store
// const history = createBrowserHistory();
// const store = configureStore();

ReactDOM.render(
  //  <Home />
    <div>
      <Counter caption="first" initValue={0} />
      <Counter caption="scend" initValue={0} />
      <Counter caption="third" initValue={0} />
    </div>
  ,
  document.getElementById('root')
);
