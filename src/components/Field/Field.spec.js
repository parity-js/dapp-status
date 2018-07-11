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
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import SemanticInput from 'semantic-ui-react/dist/commonjs/elements/Input';

import { shallowWithIntl } from '../../setupTests';
import { Field } from './Field';

const props = { onSubmit: () => Promise.resolve(), value: 'Foo' };

describe('when we have a normal input', () => {
  test('should render correctly', () => {
    const component = shallowWithIntl(<Field />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  test('should render correctly with copy button', () => {
    const component = shallowWithIntl(<Field {...props} showCopyButton />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  test('should handle copy', () => {
    global.document.execCommand = jest.fn();
    const component = shallowWithIntl(<Field {...props} showCopyButton />);
    const input = component.find(Popup).props().trigger;
    input.props.action.onClick();

    expect.assertions(3);
    expect(component.state('isCopied')).toBe(true);
    expect(global.document.execCommand).toHaveBeenCalledWith('copy');
    return new Promise(resolve => setTimeout(resolve, 2100)).then(() => {
      expect(component.state('isCopied')).toBe(false);
    });
  });

  test('should clear error when state value change', () => {
    const component = shallowWithIntl(<Field {...props} />);

    component.setState({ error: 'Some Error' });
    expect(component.state('error')).toBe('Some Error');

    const input = component.find(SemanticInput);
    input.props().onChange(null, { value: 'Bar' });
    expect(component.state('error')).toBe(null);
  });

  test('should not call onSubmit on blur if state value is not set', () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    const component = shallowWithIntl(<Field {...props} onSubmit={onSubmit} />);
    const input = component.find(SemanticInput);
    input.props().onBlur();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('should not call onSubmit on blur if state value is equal to initial value', () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    const component = shallowWithIntl(<Field {...props} onSubmit={onSubmit} />);
    const input = component.find(SemanticInput);
    input.props().onChange(null, { value: 'Foo' });
    input.props().onBlur();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('should call onSubmit on blur if state value is set', () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    const component = shallowWithIntl(<Field {...props} onSubmit={onSubmit} />);
    const input = component.find(SemanticInput);
    input.props().onChange(null, { value: 'Bar' });
    input.props().onBlur();

    expect(onSubmit).toHaveBeenCalledWith('Bar');
  });

  test('should call onSubmit on enter key press', () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    const component = shallowWithIntl(<Field {...props} onSubmit={onSubmit} />);
    const input = component.find(SemanticInput);
    input.props().onChange(null, { value: 'Bar' });
    input.props().onKeyPress({ keyCode: 13 });

    expect(onSubmit).toHaveBeenCalledWith('Bar');
  });

  test('should not call onSubmit when keypress with another key', () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    const component = shallowWithIntl(<Field {...props} onSubmit={onSubmit} />);
    const input = component.find(SemanticInput);
    input.props().onChange(null, { value: 'Bar' });
    input.props().onKeyPress({ charCode: 14 });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('when we have an action input', () => {
  const action = { content: 'Foo' };

  test('should render correctly', () => {
    const component = shallowWithIntl(<Field {...props} action={action} />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  test('should call onSubmit on action button click', () => {
    const onSubmit = jest.fn(() => Promise.resolve());
    const component = shallowWithIntl(
      <Field {...props} action={action} onSubmit={onSubmit} />
    );
    const input = component.find(SemanticInput);
    input.props().onChange(null, { value: 'Bar' });
    input.props().action.onClick();

    expect(onSubmit).toHaveBeenCalledWith('Bar');
  });

  test('should clear error on button click', () => {
    const component = shallowWithIntl(<Field {...props} action={action} />);

    component.setState({ error: 'Some Error' });
    expect(component.state('error')).toBe('Some Error');

    const input = component.find(SemanticInput);
    input.props().action.onClick();
    expect(component.state('error')).toBe(null);
  });
});

test('should change state value when changing input', () => {
  const component = shallowWithIntl(<Field {...props} />);
  const input = component.find(SemanticInput);

  input.props().onChange(null, { value: 'Bar' });
  expect(component.state('value')).toBe('Bar');
});

test('should reinitialize state value when prop value changes', () => {
  const component = shallowWithIntl(<Field {...props} />);
  component.setProps({ value: 'Bar' });

  expect(component.state('value')).toBe('Bar');
});

test('should not change state value if another prop is modified', () => {
  const component = shallowWithIntl(<Field {...props} />);
  component.setProps({ width: 2 });

  expect(component.state('value')).toBe('');
});

test('should handle isLoading and isSaved states after submitting', () => {
  const component = shallowWithIntl(<Field {...props} />);
  const input = component.find(SemanticInput);
  input.props().onChange(null, { value: 'Bar' });
  input.props().onBlur();

  expect.assertions(4);
  expect(component.state('isLoading')).toBe(true);
  return props
    .onSubmit()
    .then(() => {
      expect(component.state('isLoading')).toBe(false);
      expect(component.state('isSaved')).toBe(true);
      return new Promise(resolve => setTimeout(resolve, 2100));
    })
    .then(() => {
      expect(component.state('isSaved')).toBe(false);
    });
});

test('should handle isLoading and error if submitting yields error', () => {
  const onSubmit = () => Promise.reject('Some Error');
  const component = shallowWithIntl(<Field {...props} onSubmit={onSubmit} />);
  const input = component.find(SemanticInput);
  input.props().onChange(null, { value: 'Bar' });
  input.props().onBlur();

  expect.assertions(3);
  expect(component.state('isLoading')).toBe(true);
  return onSubmit()
    .catch(() => new Promise(resolve => setTimeout(resolve, 100)))
    .then(() => {
      expect(component.state('isLoading')).toBe(false);
      expect(component.state('error')).toBe('Some Error');
    });
});
