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

import { STATUS_OK, STATUS_BAD } from '@parity/mobx/lib/node/NodeHealthStore';
import StatusIndicator from '@parity/ui/lib/StatusIndicator';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic';
import { FormattedMessage } from 'react-intl';

import Section from '../components/Section';
import styles from './NodeHealth.css';

export class NodeHealth extends Component {
  static propTypes = {
    nodeHealthStore: PropTypes.object.isRequired
  };

  render() {
    const { nodeHealthStore: { health, overall } } = this.props;

    return (
      <Section
        title={
          <FormattedMessage
            id="dapp.status.nodeHealthTitle"
            defaultMessage="Node Health"
          />
        }
      >
        <Statistic.Group widths={4}>
          <Statistic>
            <Statistic.Value>
              {health.sync && health.sync.status === STATUS_OK ? (
                <FormattedMessage id="dapp.status.sync" defaultMessage="sync" />
              ) : (
                <FormattedMessage
                  id="dapp.status.notSync"
                  defaultMessage="not sync"
                />
              )}
            </Statistic.Value>
            <Statistic.Label>
              {health.sync && health.sync.status === STATUS_OK ? (
                <FormattedMessage
                  id="dapp.status.chainSynchronized"
                  defaultMessage="Chain Synchronized"
                />
              ) : (
                <FormattedMessage
                  id="dapp.status.chainNotSynchronized"
                  defaultMessage="Chain Not Synchronized"
                />
              )}
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              {health.peers
                ? `${health.peers.details[0]}/${health.peers.details[1]}`
                : '0/25'}
            </Statistic.Value>
            <Statistic.Label>
              <FormattedMessage
                id="dapp.status.connectedPeers"
                defaultMessage="Connected Peers"
              />
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              {health.time ? (
                <span>
                  {health.time.details}{' '}
                  <span className={styles.timeUnity}>ms</span>
                </span>
              ) : (
                '-'
              )}
            </Statistic.Value>
            <Statistic.Label>
              {health.time && health.time.status === STATUS_OK ? (
                <FormattedMessage
                  id="dapp.status.timeSynchronized"
                  defaultMessage="Time Synchronized"
                />
              ) : (
                <FormattedMessage
                  id="dapp.status.timeNotSynchronized"
                  defaultMessage="Time Not Synchronized"
                />
              )}
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              <StatusIndicator
                id="overall"
                status={overall ? overall.status : STATUS_BAD}
              />
            </Statistic.Value>
            <Statistic.Label>
              <FormattedMessage
                id="dapp.status.overallHealth"
                defaultMessage="Overall"
              />
            </Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Section>
    );
  }
}

export default inject('nodeHealthStore')(observer(NodeHealth));
