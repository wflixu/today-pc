import * as React from "react";
import UserComponent from './User';
interface MyProps {
  initValue:number;
  caption:string
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
export class Counter extends React.Component<MyProps,MyState>{
  constructor (props: Readonly<MyProps>){
    super(props);
    this.onClickIncrement = this.onClickIncrement.bind(this);
    this.onClickDecrement = this.onClickDecrement.bind(this);
    this.state = {count:props.initValue||0}
  }
  onClickIncrement (){
    this.setState({count:this.state.count +1});
  }
  onClickDecrement (){
    this.setState({count:this.state.count -1});
  }
  componentWillMount(){
    // tslint:disable-next-line:no-console
    console.log('enter componerntwill mount' +this.props.caption )
  }
  render(){
    const {caption} =this.props;
    return (
      // tslint:disable-next-line:jsx-self-close
      <div>
          <button onClick={this.onClickIncrement}>+</button>
          <span>{caption}:{this.state.count}</span>
          <button onClick={this.onClickDecrement}>-</button>
      </div>
      )
  }
}








