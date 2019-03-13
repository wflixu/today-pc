import * as React from "react";
import UserComponent from './User';
interface Props {
  foo:string;
}
interface MyState {
  count : number;
}

export const Home = () => {
  return <div>
    {/* React components must have a wrapper node/element */}
    <h1>A Simple React Component Example with Typescript</h1>
    <UserComponent name="Luke Skywalker" age={20} address="That sandy planet" dob={new Date()} />
  </div >
}


export const Hello :React.SFC<{compiler:string,framework:string}> = (props) =>{
  return (
    <div>
      <div>{props.compiler}</div>
      <div>{props.framework}</div>
    </div>
  )
}
export class Counter extends React.Component<{},MyState>{
  constructor (props: Readonly<Props>){
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
    this.state = {count:0}
  }
  onClickButton (){
    this.setState({count:this.state.count +1});
  }
  render(){
    return (
      // tslint:disable-next-line:jsx-self-close
      <div>
          <button onClick={this.onClickButton}>click me</button>
          <span>click count :{this.state.count}</span>
      </div>
      )
  }
}







