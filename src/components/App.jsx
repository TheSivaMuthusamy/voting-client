import React from 'react';
import {List} from 'immutable';
import {Route} from 'react-router-dom';
import Voting from './Voting';
import Results from './Results';


export default class App extends React.Component {

	render() {
		return this.props.children;
	}
}