// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';

import Mining from '../Mining';
import Logs from '../Logs';
import Network from '../Network';
import NodeHealth from '../NodeHealth';
import Peers from '../Peers';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <NodeHealth />
        <Segment.Group horizontal>
          <Mining />
          <Network />
        </Segment.Group>
        <Peers />
        <Logs />
      </div>
    );
  }
}

export default observer(App);
