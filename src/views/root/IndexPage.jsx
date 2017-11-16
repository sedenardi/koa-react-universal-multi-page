import React from 'react';
import Menubar from '../common/Menu.jsx';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Menubar />
        <h1>Index</h1>
        This is the index page.
        <br />
        <br />
        <a href="/user">Go To User</a>
      </div>
    );
  }
}
