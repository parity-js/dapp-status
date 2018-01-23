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
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { mountWithIntl } from '../setupTests';
import { Logs } from './Logs';

const props = {
  devLogsStore: {
    parsedLogs: [
      { date: '1-1-1', log: 'FooLog' },
      { date: '2-2-2', log: 'BarLog' }
    ]
  },
  devLogsLevelsStore: {
    devLogsLevels: 'Baz'
  }
};

test('should render correctly when not logging', () => {
  const component = shallow(<Logs {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly when logging', () => {
  const component = shallow(<Logs {...props} />);
  component.setState({ isLogging: true });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly when sort ascending', () => {
  const component = shallow(<Logs {...props} />);
  component.setState({ isLogging: true, sort: 'ascending' });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle toggle logging', () => {
  const component = mountWithIntl(<Logs {...props} />);
  const button = component.find(Button).first();

  button.props().onClick();
  expect(component.state('isLogging')).toBe(true);

  button.props().onClick();
  expect(component.state('isLogging')).toBe(false);
});

test('should handle toggle sort', () => {
  const component = mountWithIntl(<Logs {...props} />);
  const button = component.find(Button).at(1);

  button.props().onClick();
  expect(component.state('sort')).toBe('ascending');

  button.props().onClick();
  expect(component.state('sort')).toBe('descending');
});
