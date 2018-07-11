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
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { STATUS_OK } from '@parity/ui/lib/StatusIndicator/store';

import { NodeHealth } from './NodeHealth';

const props = {
  syncingStore: {
    syncing: false
  },
  netPeersStore: {
    netPeers: {
      connected: { toFormat: () => 2 }, // Quickly mock BigNumber.js
      max: { toFormat: () => 25 }
    }
  },
  statusStore: {
    overall: STATUS_OK
  }
};

test('should render correctly', () => {
  const component = shallow(<NodeHealth {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly not fully loaded', () => {
  const component = shallow(
    <NodeHealth statusStore={{}} syncingStore={{}} netPeersStore={{}} />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});
