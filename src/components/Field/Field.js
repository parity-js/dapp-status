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
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import SemanticInput from 'semantic-ui-react/dist/commonjs/elements/Input';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

export class Field extends Component {
  static propTypes = {
    action: PropTypes.object,
    intl: intlShape,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onSubmit: PropTypes.func,
    readOnly: PropTypes.bool,
    showCopyButton: PropTypes.bool, // Will be overridden if action is set
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.number
  };

  state = {
    error: null,
    isCopied: false,
    isLoading: false,
    isSaved: false,
    value: null
  };

  componentWillReceiveProps({ value }) {
    // Reset field when new value comes
    if (this.props.value !== value && value) {
      this.setState({ value });
    }
  }

  handleChange = (_, { value }) => this.setState({ value, error: null });

  handleClearError = () => this.setState({ error: null });

  handleCopy = () => {
    // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    var tmp = document.createElement('textarea');
    tmp.innerText = this.props.value;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    tmp.remove();
    this.setState({ isCopied: true });
    setTimeout(() => this.setState({ isCopied: false }), 2000);
  };

  handleKeyPress = event => {
    // Submit on enter
    if (event.keyCode === 13 || event.charCode === 13) {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    if (!this.state.value || this.state.value === this.props.value) {
      return;
    }

    this.setState({ isLoading: true });
    this.props
      .onSubmit(this.state.value)
      .then(() => this.setState({ isLoading: false, isSaved: true }))
      .then(() => new Promise(resolve => setTimeout(resolve, 2000)))
      .then(() => this.setState({ isSaved: false }))
      .catch(error => this.setState({ isLoading: false, error }));
  };

  /**
   * Render an input which submits through an action button
   */
  renderActionInput = () => {
    const {
      action,
      intl: { formatMessage },
      label,
      readOnly,
      showCopyButton,
      value,
      ...rest
    } = this.props;

    // Customize the action of the input depending on state
    let inputAction;
    if (this.state.error) {
      inputAction = {
        ...action,
        content: formatMessage(messages.clearError),
        icon: 'remove',
        onClick: this.handleClearError,
        size: 'tiny'
      };
    } else if (this.state.isSaved) {
      inputAction = {
        ...action,
        content: formatMessage(messages.success),
        disabled: true,
        icon: 'check',
        positive: true,
        size: 'tiny'
      };
    } else {
      inputAction = {
        ...action,
        disabled: !this.state.value || this.state.isLoading,
        loading: this.state.isLoading,
        onClick: this.handleSubmit,
        primary: true,
        size: 'tiny'
      };
    }

    return (
      <SemanticInput
        action={inputAction}
        onChange={this.handleChange}
        readOnly={readOnly || this.state.isLoading || this.state.isSaved} // Don't allow changing when loading
        value={this.state.value} // Controlled component
        {...rest}
      />
    );
  };

  /**
   * Render an input with an icon, which submits through blur or keypress
   */
  renderIconInput = () => {
    const {
      action,
      label,
      readOnly,
      showCopyButton,
      value,
      ...rest
    } = this.props;
    return (
      <SemanticInput
        action={
          showCopyButton && {
            icon: 'copy',
            onClick: this.handleCopy
          }
        }
        loading={this.state.isLoading}
        icon={this.state.isSaved ? { name: 'check', color: 'green' } : true}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleSubmit}
        onChange={this.handleChange}
        readOnly={readOnly || this.state.isLoading} // Don't allow changing when loading
        value={this.state.value} // Controlled component
        {...rest}
      />
    );
  };

  renderInput = () =>
    this.props.action ? this.renderActionInput() : this.renderIconInput();

  render() {
    const { label, showCopyButton, width } = this.props;
    return (
      <Form.Field width={width}>
        <label>{label}</label>
        {showCopyButton ? (
          <Popup
            content={
              <FormattedMessage
                id="dapp.status.field.copied"
                defaultMessage="Copied"
              />
            }
            inverted
            open={this.state.isCopied}
            position="top center"
            size="mini"
            trigger={this.renderInput()}
          />
        ) : (
          this.renderInput()
        )}
        {this.state.error && (
          <Label basic color="red" pointing>
            {this.state.error.toString()}
          </Label>
        )}
      </Form.Field>
    );
  }
}

export default injectIntl(Field);

const messages = {
  clearError: {
    id: 'dapp.status.field.clearError',
    defaultMessage: 'Clear Error'
  },
  success: {
    id: 'dapp.status.field.success',
    defaultMessage: 'Success'
  }
};
