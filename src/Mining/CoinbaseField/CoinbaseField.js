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
import IdentityIcon from '@parity/ui/lib/IdentityIcon';
import { injectIntl, intlShape } from 'react-intl';

import styles from './CoinbaseField.css';

export class CoinbaseField extends Component {
  static propTypes = {
    accountsStore: PropTypes.object.isRequired,
    coinbaseStore: PropTypes.object.isRequired,
    intl: intlShape
  };

  handleCoinbaseChange = (_, { value }) => {
    this.props.coinbaseStore.setAuthor(value);
  };

  render() {
    const {
      accountsStore: { accounts },
      coinbaseStore: { coinbase },
      intl: { formatMessage }
    } = this.props;

    return (
      <Form.Select
        icon={
          coinbase && (
            <IdentityIcon
              address={coinbase}
              alt={coinbase}
              className={styles.coinbaseAvatar}
            />
          )
        }
        label={formatMessage(messages.coinbaseLabel)}
        onChange={this.handleCoinbaseChange}
        options={accounts.map(account => ({
          image: <IdentityIcon address={account} alt={account} />,
          key: account,
          value: account,
          text: account
        }))}
        value={coinbase}
      />
    );
  }
}

export default injectIntl(
  inject('accountsStore', 'coinbaseStore')(observer(CoinbaseField))
);

const messages = {
  coinbaseLabel: {
    id: 'dapp.status.mining.coinbaseLabel',
    defaultMessage: 'Mining Author'
  }
};
