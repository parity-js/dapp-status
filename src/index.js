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
import ReactDOM from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import ContextProvider from '@parity/ui/lib/ContextProvider';
import {
  AccountsStore,
  ChainStore,
  CoinbaseStore,
  DefaultExtraDataStore,
  DevLogsLevelsStore,
  DevLogsStore,
  EnodeStore,
  ExtraDataStore,
  GasFloorTargetStore,
  HashrateStore,
  LatestBlockStore,
  MinGasPriceStore,
  NetPeersStore,
  NetPortStore,
  NodeHealthStore,
  RpcSettingsStore
} from '@parity/mobx/lib';
import 'semantic-ui-css/semantic.min.css';

import api from './api';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootStore = {
  accountsStore: AccountsStore.get(api),
  chainStore: ChainStore.get(api),
  coinbaseStore: CoinbaseStore.get(api),
  defaultExtraDataStore: DefaultExtraDataStore.get(api),
  devLogsLevelsStore: DevLogsLevelsStore.get(api),
  devLogsStore: DevLogsStore.get(api),
  enodeStore: EnodeStore.get(api),
  extraDataStore: ExtraDataStore.get(api),
  gasFloorTargetStore: GasFloorTargetStore.get(api),
  hashrateStore: HashrateStore.get(api),
  latestBlockStore: LatestBlockStore.get(api),
  minGasPriceStore: MinGasPriceStore.get(api),
  netPeersStore: NetPeersStore.get(api),
  netPortStore: NetPortStore.get(api),
  nodeHealthStore: NodeHealthStore.get(api),
  rpcSettingsStore: RpcSettingsStore.get(api)
};

ReactDOM.render(
  <ContextProvider api={api}>
    <MobxProvider {...rootStore}>
      <App />
    </MobxProvider>
  </ContextProvider>,
  document.getElementById('root')
);
registerServiceWorker();
