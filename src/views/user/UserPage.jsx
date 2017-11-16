import PropTypes from 'prop-types';
import React from 'react';
import Menubar from '../common/Menu.jsx';

export default class UserPage extends React.Component {
  render() {
    return (
      <div>
        <Menubar />
        <h1>User</h1>
        This is the user page.
        <br />
        <br />
        It's rendering a random number from the props: {this.props.propNumber}
        <br />
        <br />
        <a href="/">Go Back To Index</a>
      </div>
    );
  }
}
UserPage.propTypes = {
  propNumber: PropTypes.number.isRequired
};
