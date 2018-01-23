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

import Field from '../components/Field';
import { Mining } from './Mining';

const props = {
  extraDataStore: {
    extraData: 'Foo',
    saveExtraData: jest.fn()
  },
  gasFloorTargetStore: {
    gasFloorTarget: 'Bar',
    saveGasFloorTarget: jest.fn()
  },
  hashrateStore: {
    hashrate: 'Baz'
  },
  latestBlockStore: {
    latestBlock: { number: 5, timestamp: '2' }
  },
  minGasPriceStore: {
    minGasPrice: 'Qux',
    saveMinGasPrice: jest.fn()
  }
};

test('should render correctly', () => {
  const component = shallow(<Mining {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly not fully loaded', () => {
  const component = shallow(
    <Mining
      {...props}
      latestBlockStore={{ latestBlock: {} }}
      hashrateStore={{}}
    />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle saveExtraData', () => {
  const component = shallow(<Mining {...props} />);
  component
    .find(Field)
    .first()
    .props()
    .onSubmit('Test Data');

  expect(props.extraDataStore.saveExtraData).toHaveBeenCalledWith('Test Data');
});

test('should handle minGasPriceStore', () => {
  const component = shallow(<Mining {...props} />);
  component
    .find(Field)
    .at(1)
    .props()
    .onSubmit('22');

  expect(props.minGasPriceStore.saveMinGasPrice).toHaveBeenCalledWith(22);
});

test('should handle saveGasFloorTarget', () => {
  const component = shallow(<Mining {...props} />);
  component
    .find(Field)
    .at(2)
    .props()
    .onSubmit('22');

  expect(props.gasFloorTargetStore.saveGasFloorTarget).toHaveBeenCalledWith(22);
});
