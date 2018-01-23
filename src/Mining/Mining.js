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
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic';
import { FormattedMessage } from 'react-intl';
import formatNumber from 'format-number';

import Field from '../components/Field';
import LowerCaseStatistic from '../components/LowerCaseStatistic';
import Section from '../components/Section';
import CoinbaseField from './CoinbaseField/CoinbaseField';
import decodeExtraData from './utils/decodeExtraData';
import numberFromString from './utils/numberFromString';

const toNiceNumber = formatNumber();

export class Mining extends Component {
  static propTypes = {
    extraDataStore: PropTypes.object.isRequired,
    gasFloorTargetStore: PropTypes.object.isRequired,
    hashrateStore: PropTypes.object.isRequired,
    latestBlockStore: PropTypes.object.isRequired,
    minGasPriceStore: PropTypes.object.isRequired
  };

  handleExtraDataChange = value =>
    this.props.extraDataStore.saveExtraData(value);

  handleGasFloorTargetChange = value =>
    this.props.gasFloorTargetStore.saveGasFloorTarget(numberFromString(value));

  handleMinGasPriceChange = value =>
    this.props.minGasPriceStore.saveMinGasPrice(numberFromString(value));

  render() {
    const {
      extraDataStore: { extraData },
      gasFloorTargetStore: { gasFloorTarget },
      hashrateStore: { hashrate },
      latestBlockStore: { latestBlock },
      minGasPriceStore: { minGasPrice }
    } = this.props;

    return (
      <Section
        title={
          <FormattedMessage
            id="dapp.status.mining.title"
            defaultMessage="Mining Settings"
          />
        }
      >
        <Form>
          <CoinbaseField />
          <Field
            label={
              <FormattedMessage
                id="dapp.status.mining.extraDataLabel"
                defaultMessage="Extra Data"
              />
            }
            onSubmit={this.handleExtraDataChange}
            value={decodeExtraData(extraData)}
          />
          <Field
            label={
              <FormattedMessage
                id="dapp.status.mining.minGasPriceLabel"
                defaultMessage="Minimum Gas Price"
              />
            }
            onSubmit={this.handleMinGasPriceChange}
            value={toNiceNumber(minGasPrice)}
          />
          <Field
            label={
              <FormattedMessage
                id="dapp.status.mining.gasFloorTargetLabel"
                defaultMessage="Gas Floor Target"
              />
            }
            onSubmit={this.handleGasFloorTargetChange}
            value={toNiceNumber(gasFloorTarget)}
          />
        </Form>
        <LowerCaseStatistic size="tiny" widths={2}>
          <Statistic>
            <Statistic.Value>{`#${toNiceNumber(
              latestBlock.number || ' -'
            )}`}</Statistic.Value>
            <Statistic.Label>
              <FormattedMessage
                id="dapp.status.mining.bestBlockLabel"
                defaultMessage="Best Block, at {time}"
                values={{
                  time: new Date(latestBlock.timestamp)
                    .toTimeString()
                    .split(' ')[0]
                }}
              />
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{`${hashrate || 0} H/s`}</Statistic.Value>
            <Statistic.Label>
              <FormattedMessage
                id="dapp.status.mining.hashrateLabel"
                defaultMessage="Hash Rate"
              />
            </Statistic.Label>
          </Statistic>
        </LowerCaseStatistic>
      </Section>
    );
  }
}

export default inject(
  'extraDataStore',
  'gasFloorTargetStore',
  'hashrateStore',
  'latestBlockStore',
  'minGasPriceStore'
)(observer(Mining));
