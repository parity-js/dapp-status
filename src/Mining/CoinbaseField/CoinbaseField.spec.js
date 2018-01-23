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
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import { shallowWithIntl } from '../../setupTests';
import { CoinbaseField } from './CoinbaseField';

const props = {
  accountsStore: {
    accounts: [
      '0xC257274276a4E539741Ca11b590B9447B26A8051',
      '0x1f73b8e1942165739516a93b25eac7ff1920dc1b'
    ]
  },
  coinbaseStore: {
    coinbase: '0x1f73b8e1942165739516a93b25eac7ff1920dc1b',
    setAuthor: jest.fn()
  }
};

test('should render correctly', () => {
  const component = shallowWithIntl(<CoinbaseField {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle setAuthor', () => {
  const component = shallowWithIntl(<CoinbaseField {...props} />);
  const input = component.find(Form.Select);
  input.props().onChange(null, { value: 'Foo' });

  expect(props.coinbaseStore.setAuthor).toHaveBeenCalledWith('Foo');
});
