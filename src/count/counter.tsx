import * as React from 'react';
import store from  './Store';
import * as Actions from './Actions';
interface MyProps {
    caption:string,
}

interface  MyState{
    first:number,
    second:number,
    third:number
}

export class Counter extends React.Component<MyProps,MyState> {
    constructor(props: MyProps) {
        super(props);
        this.onClickIncrement = this.onClickIncrement.bind(this);
        this.onClickDecrement = this.onClickDecrement.bind(this);
        this.state = this.getOwnState();
    }
    getOwnState(){
        return {
            value:store.getState()[this.props.caption]
        }
    }
    onClickIncrement() {
        store.dispatch(Actions.increment(this.props.caption));
    }
    onClickDecrement() {
        store.dispatch(Actions.decrement(this.props.caption));
    }
    onChange(){
        this.setState(this.getOwnState());
    }
    componentDidMount(){
        store.subscribe(this.onChange);
    }
    componentWillUnmount(){
        store.unsubscribe(this.onChange);
    }

    componentWillMount() {
        // tslint:disable-next-line:no-console
        console.log('enter componerntwill mount' + this.props.caption)
    }

    render() {
        const value =this.state.value;
        const { caption } = this.props;
        return (
            // tslint:disable-next-line:jsx-self-close
            <div>
                <button onClick={this.onClickIncrement}>+</button>
                <button onClick={this.onClickDecrement}>-</button>
                <span>{caption}:{this.state.value}</span>
            </div>
        )
    }
}