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
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import { FormattedMessage } from 'react-intl';

import EnodeField from './EnodeField';
import styles from './ReservedPeersForm.css';

export class ReservedPeersForm extends Component {
  state = {
    acceptNonReservedPeers: true
  };

  static propTypes = {
    netPeersStore: PropTypes.object.isRequired
  };

  handleToggleReservedPeers = (_, { checked }) => {
    const { netPeersStore } = this.props;
    this.setState({ acceptNonReservedPeers: checked });
    if (checked) {
      netPeersStore.acceptNonReservedPeers();
    } else {
      netPeersStore.dropNonReservedPeers();
    }
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Field className={styles.alignedField} width={3}>
            <Header as="h4">
              <FormattedMessage
                id="dapp.status.peers.reservedPeersForm.title"
                defaultMessage="Network Peers Settings"
              />:
            </Header>
          </Form.Field>
          <Form.Checkbox
            checked={this.state.acceptNonReservedPeers}
            className={styles.alignedField}
            label={
              <label>
                <FormattedMessage
                  id="dapp.status.peers.reservedPeersForm.acceptNonReservedPeers"
                  defaultMessage="Accept non-reserved peers"
                />
              </label>
            }
            onChange={this.handleToggleReservedPeers}
            slider
            width={3}
          />
          <EnodeField addRemove="ADD" />
          <EnodeField addRemove="REMOVE" />
        </Form.Group>
      </Form>
    );
  }
}

export default inject('netPeersStore')(observer(ReservedPeersForm));
