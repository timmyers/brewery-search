import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import TitledBox from 'components/TitledBox';

class ProfileForm extends React.Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleLogOut = () => {
    this.setState({ open: false });
    this.props.logout();
  };

  render() {
    const { user } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={this.handleClose} />,
      <FlatButton label="Log Out" primary onTouchTap={this.handleLogOut} />,
    ];

    return (
      <TitledBox title="Profile">
        { user === null ?
          <span>Not logged in.</span>
        :
          <span>
            { `Hello, ${user.username}.` }
          </span>
        }
        <FlatButton onTouchTap={this.handleOpen}>Log Out</FlatButton>
        <Dialog
          title="Log Out"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to log out?
        </Dialog>
      </TitledBox>
    );
  }
}

export default ProfileForm;
