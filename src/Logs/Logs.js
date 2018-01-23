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
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import { FormattedMessage } from 'react-intl';

import Section from '../components/Section';
import styles from './Logs.css';

export class Logs extends Component {
  state = {
    isLogging: false,
    sort: 'descending'
  };

  static propTypes = {
    devLogsLevelsStore: PropTypes.object.isRequired,
    devLogsStore: PropTypes.object.isRequired
  };

  handleToggleLogging = () =>
    this.setState({ isLogging: !this.state.isLogging });

  handleToggleSort = () =>
    this.setState({
      sort: this.state.sort === 'ascending' ? 'descending' : 'ascending'
    });

  renderLogs = () => {
    const { sort } = this.state;
    const { devLogsStore } = this.props;

    const logs =
      sort === 'descending'
        ? devLogsStore.parsedLogs
            .slice()
            .reverse()
            .slice(0, 25)
        : devLogsStore.parsedLogs.slice(0, 25);

    return logs.map((log, index) => (
      <p key={index} className={styles.log}>
        <span className={styles.logDate}>[{log.date.toLocaleString()}]</span>
        <span className={styles.logText}>{log.log}</span>
      </p>
    ));
  };

  render() {
    const { devLogsLevelsStore } = this.props;

    return (
      <Section
        title={
          <div>
            <FormattedMessage
              as={Header.Content}
              id="dapp.status.logs.title"
              defaultMessage="Node Logs"
            />
            <Header.Subheader>
              <FormattedMessage
                as={Header.Content}
                id="dapp.status.logs.subtitle"
                defaultMessage="Debug Level: {level}"
                values={{ level: devLogsLevelsStore.devLogsLevel || 'Default' }}
              />
              <Button
                basic
                circular
                className={styles.settingsButton}
                compact
                icon={this.state.isLogging ? 'pause' : 'play'}
                onClick={this.handleToggleLogging}
                size="large"
              />
              <Button
                basic
                circular
                className={styles.settingsButton}
                compact
                icon={`sort numeric ${this.state.sort}`}
                onClick={this.handleToggleSort}
                size="large"
              />
            </Header.Subheader>
          </div>
        }
      >
        {this.state.isLogging ? (
          this.renderLogs()
        ) : (
          <FormattedMessage
            id="dapp.status.logs.isLogging"
            defaultMessage="Refresh and display of logs from Parity is currently stopped via the UI, start it to see the latest updates."
          />
        )}
      </Section>
    );
  }
}

export default inject('devLogsLevelsStore', 'devLogsStore')(observer(Logs));
