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
import { injectIntl, intlShape } from 'react-intl';

import Field from '../../../components/Field';

export class EnodeField extends Component {
  static propTypes = {
    addRemove: PropTypes.oneOf(['ADD', 'REMOVE']),
    intl: intlShape,
    netPeersStore: PropTypes.object.isRequired
  };
  render() {
    const { addRemove, intl: { formatMessage }, netPeersStore } = this.props;

    return (
      <Field
        action={{
          content: formatMessage(messages.reservedPeerButton, {
            add: addRemove === 'ADD'
          }),
          icon: addRemove === 'ADD' ? 'plus' : 'minus'
        }}
        onSubmit={
          addRemove === 'ADD'
            ? netPeersStore.addReservedPeer.bind(netPeersStore)
            : netPeersStore.removeReservedPeer.bind(netPeersStore)
        }
        placeholder={formatMessage(messages.reservedPeerPlaceholder, {
          add: addRemove === 'ADD'
        })}
        size="small"
        width={5}
      />
    );
  }
}

export default injectIntl(inject('netPeersStore')(observer(EnodeField)));

const messages = {
  reservedPeerButton: {
    id: 'dapp.status.peers.enodeField.reservedPeerButton',
    defaultMessage: '{add, select, true {Add} false {Remove}} Reserved Peer'
  },
  reservedPeerError: {
    id: 'dapp.status.peers.enodeField.reservedPeerError',
    defaultMessage: 'Clear Error'
  },
  reservedPeerFulfilled: {
    id: 'dapp.status.peers.enodeField.reservedPeerFulfilled',
    defaultMessage:
      'Enode successfully {add, select, true {added} false {removed}}'
  },
  reservedPeerPlaceholder: {
    id: 'dapp.status.peers.enodeField.reservedPeerPlaceholder',
    defaultMessage: 'Enode address to {add, select, true {add} false {remove}}'
  }
};
