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

import { shallowWithIntl } from '../../../setupTests';
import { EnodeField } from './EnodeField';
import Field from '../../../components/Field';

const props = {
  netPeersStore: {
    addReservedPeer: jest.fn(),
    netPeers: {
      active: BigNumber(1),
      connected: BigNumber(2),
      max: BigNumber(3)
    },
    realEnodeField: [],
    removeReservedPeer: jest.fn()
  }
};

test('should render correctly the Add field', () => {
  const component = shallowWithIntl(
    <EnodeField {...props} addRemove={'ADD'} />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle add reserved peers', () => {
  const component = shallowWithIntl(
    <EnodeField {...props} addRemove={'ADD'} />
  );
  const field = component.find(Field);

  field.props().onSubmit();
  expect(props.netPeersStore.addReservedPeer).toHaveBeenCalled();
});

test('should render correctly the Remove field', () => {
  const component = shallowWithIntl(
    <EnodeField {...props} addRemove={'REMOVE'} />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle remove reserved peers', () => {
  const component = shallowWithIntl(
    <EnodeField {...props} addRemove={'REMOVE'} />
  );
  const field = component.find(Field);

  field.props().onSubmit();
  expect(props.netPeersStore.removeReservedPeer).toHaveBeenCalled();
});
