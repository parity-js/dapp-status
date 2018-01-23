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

import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import BigNumber from 'bignumber.js';

import { shallowWithIntl } from '../setupTests';
import { Network } from './Network';

const props = {
  chainStore: { chain: 'Foo' },
  enodeStore: { enode: 'Bar' },
  netPeersStore: {
    netPeers: {
      active: BigNumber(1),
      connected: BigNumber(2),
      max: BigNumber(3)
    }
  },
  netPortStore: { netPort: BigNumber(4) },
  rpcSettingsStore: {
    rpcSettings: { enabled: true, interface: 'Baz', port: 'Qux' }
  }
};

test('should render correctly', () => {
  const component = shallowWithIntl(<Network {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly when not fully loaded', () => {
  const component = shallowWithIntl(
    <Network
      {...props}
      rpcSettingsStore={{ rpcSettings: { enabled: false } }}
      netPeersStore={{ netPeers: { realPeers: [] } }}
    />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});
