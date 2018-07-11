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
import StatusStore from '@parity/ui/lib/StatusIndicator/store';
import stores from '@parity/mobx';
import 'semantic-ui-css/semantic.min.css';

import api from './api';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootStore = {
  accountsStore: stores.eth.accounts().get(api),
  chainStore: stores.parity.netChain().get(api),
  coinbaseStore: stores.eth.coinbase().get(api),
  defaultExtraDataStore: stores.parity.defaultExtraData().get(api),
  devLogsLevelsStore: stores.parity.devLogsLevels().get(api),
  devLogsStore: stores.parity.devLogs().get(api),
  enodeStore: stores.parity.enode().get(api),
  extraDataStore: stores.parity.extraData().get(api),
  gasFloorTargetStore: stores.parity.gasFloorTarget().get(api),
  hashrateStore: stores.eth.hashrate().get(api),
  latestBlockStore: stores.eth.getBlockByNumber('latest').get(api),
  minGasPriceStore: stores.parity.minGasPrice().get(api),
  netPeersStore: stores.parity.netPeers().get(api),
  netPortStore: stores.parity.netPort().get(api),
  rpcSettingsStore: stores.parity.rpcSettings().get(api),
  statusStore: StatusStore.get(api),
  syncingStore: stores.eth.syncing().get(api)
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
