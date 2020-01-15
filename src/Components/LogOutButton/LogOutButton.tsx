import * as React from 'react';
import { connect } from 'react-redux';
import { logOutAction } from '../../actions';
import Button from 'react-bootstrap/Button'

export interface ILogOutButtonProps {
    logOut(): void,
}

 class _LogOutButton extends React.Component<ILogOutButtonProps> {
     public render() {
      const {logOut} = this.props
    return (
      <div>
            <Button variant="outline-secondary" onClick={logOut} style={{ marginRight: "10px" }} size="sm" >Sign Out</Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
    logOut:logOutAction
}

export const LogOutButton = connect(
    undefined,
    mapDispatchToProps
)(_LogOutButton)