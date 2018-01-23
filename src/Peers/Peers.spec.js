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
import BigNumber from 'bignumber.js';

import { Peers } from './Peers';
import Section from '../components/Section';

const props = {
  netPeersStore: {
    netPeers: {
      active: BigNumber(1),
      connected: BigNumber(2),
      max: BigNumber(3)
    },
    realPeers: [
      {
        caps: ['Foo'],
        id: 'Bar',
        name: 'Baz',
        network: { remoteAddress: 'Qux' },
        protocols: { eth: { difficulty: BigNumber(20), head: '0x123' } }
      }
    ]
  }
};

test('should render correctly without settings', () => {
  const component = shallow(<Peers {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly when showing settings', () => {
  const component = shallow(<Peers {...props} />);
  component.setState({ showSettings: true });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle toggle settings', () => {
  const component = shallow(<Peers {...props} />);
  const button = component.find(Section).props().title.props.children[1];

  button.props.onClick();
  expect(component.state('showSettings')).toBe(true);

  button.props.onClick();
  expect(component.state('showSettings')).toBe(false);
});
