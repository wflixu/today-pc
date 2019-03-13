
import * as React from "react";

interface UserInterfaceProps {
  name: string;
  age: number;
  address: string;
  dob: Date;
}
export default class UserComponent extends React.Component<UserInterfaceProps, {}> {

    constructor(props: UserInterfaceProps) {
      super(props);
    }
    render() {
      return (
        <div>
          <h1>User Component</h1>
          Hello, {this.props.name}
          <br />
          You are {this.props.age} years old,
          <br />
          You live at: {this.props.address}
          <br />
          you were born: {this.props.dob.toDateString()}
        </div>
      );
    }
  }