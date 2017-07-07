import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, HashRouter as Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import io from 'socket.io-client';
import remoteActionMiddleware from './remote_action_middleware';
import {Provider} from 'react-redux';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
import {setState, setClientId} from './action_creators';
import getClientId from './client_id';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
	store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));
	

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path="/results" component={ResultsContainer} />
				<Route exact path="/" component={VotingContainer} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById('app')
);
