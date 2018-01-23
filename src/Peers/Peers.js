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
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import ScrollableText from '@parity/ui/lib/ScrollableText';
import ShortenedHash from '@parity/ui/lib/ShortenedHash';
import { FormattedMessage } from 'react-intl';

import ReservedPeersForm from './ReservedPeersForm';
import Section from '../components/Section';
import styles from './Peers.css';

export class Peers extends Component {
  state = {
    showSettings: false
  };

  static propTypes = {
    netPeersStore: PropTypes.object.isRequired
  };

  handleToggleSettings = () =>
    this.setState({
      showSettings: !this.state.showSettings
    });

  renderRow = (peer, index) => {
    const { caps, id, name, network, protocols } = peer;
    return (
      <Table.Row key={id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>
          <ScrollableText text={id} />
        </Table.Cell>
        <Table.Cell>{network.remoteAddress}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>
          <ShortenedHash data={protocols.eth.head} />
        </Table.Cell>
        <Table.Cell>
          {protocols.eth.difficulty.gt(0) &&
            protocols.eth.difficulty.toExponential(16)}
        </Table.Cell>
        <Table.Cell>{caps && caps.join(', ')}</Table.Cell>
      </Table.Row>
    );
  };

  render() {
    const { netPeersStore: { realPeers } } = this.props;

    return (
      <Section
        title={
          <div>
            <FormattedMessage
              id="dapp.status.peers.title"
              defaultMessage="Network Peers"
            />
            <Button
              basic
              circular
              className={styles.settingsButton}
              compact
              icon="setting"
              onClick={this.handleToggleSettings}
              size="large"
            />
          </div>
        }
      >
        {this.state.showSettings && <ReservedPeersForm />}
        <Table celled selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell singleLine>
                <FormattedMessage
                  id="dapp.status.peers.idLabel"
                  defaultMessage="ID"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="dapp.status.peers.remoteAddressLabel"
                  defaultMessage="Remote Address"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="dapp.status.peers.nameLabel"
                  defaultMessage="Name"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="dapp.status.peers.ethHeaderLabel"
                  defaultMessage="Header (ETH)"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="dapp.status.peers.ethDiffLabel"
                  defaultMessage="Difficulty (ETH)"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="dapp.status.peers.capsLabel"
                  defaultMessage="Capabilities"
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{realPeers.map(this.renderRow)}</Table.Body>
        </Table>
      </Section>
    );
  }
}

export default inject('netPeersStore')(observer(Peers));
