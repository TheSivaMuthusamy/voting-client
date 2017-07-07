import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Russell Westbrook', 'James Harden'),
					tally: Map({'Russell Westbrook': 1})
				})
			})
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: List.of('Russell Westbrook', 'James Harden'),
				tally: Map({'Russell Westbrook': 1})
			}
		}));
	});

	it('handles SET_STATE with plain JS payload', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Russell Westbrook', 'James Harden'),
					tally: Map({'Russell Westbrook': 1})
				})
			})
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Russell Westbrook', 'James Harden'],
				tally: {'Russell Westbrook': 1}
			}
		}));
	});

	it('handles SET_STATE witohut initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Russell Westbrook', 'James Harden'],
					tally: {'Russell Westbrook': 1}
				}
			}
		};
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Russell Westbrook', 'James Harden'],
				tally: {'Russell Westbrook': 1}
			}
		}));
	});

	it('handles VOTE by setting myVote', () => {
  		const state = fromJS({
    		vote: {
    			round: 42,
      			pair: ['Russell Westbrook', 'James Harden'],
      			tally: {'Russell Westbrook': 1}
    		}
  		});
  		const action = {type: 'VOTE', entry: 'Russell Westbrook'};
  		const nextState = reducer(state, action);

  		expect(nextState).to.equal(fromJS({
    		vote: {
    			round: 42,
      			pair: ['Russell Westbrook', 'James Harden'],
      			tally: {'Russell Westbrook': 1}
    		},
    		myVote: {
    			round: 42,
    			entry: 'Russell Westbrook'
    		}
  		}));
	});

	it('does not set myBote for VOTE on invalid entry', () => {
  		const state = fromJS({
    		vote: {
    			round: 42,
      			pair: ['Russell Westbrook', 'James Harden'],
      			tally: {'Russell Westbrook': 1}
    		}
  		});
  		const action = {type: 'VOTE', entry: 'Kevin Durant'};
  		const nextState = reducer(state, action);

  		expect(nextState).to.equal(fromJS({
    		vote: {
    			round: 42,
      			pair: ['Russell Westbrook', 'James Harden'],
      			tally: {'Russell Westbrook': 1}
    		}
  		}));
	});

	it('removes myVote on SET_STATE if round changes', () => {
  		const initialState = fromJS({
    		vote: {
    			round: 42,
      			pair: ['Russell Westbrook', 'James Harden'],
      			tally: {'Russell Westbrook': 1}
    		},
    		myVote: {
    			round: 42,
    			entry: 'Russell Westbrook'
    		}
  		});
  		const action = {
    		type: 'SET_STATE',
    		state: {
      			vote: {
      				round: 43,
        			pair: ['Kevin Durant', 'Russell Westbrook']
      			}
    		}
  		};
  		const nextState = reducer(initialState, action);

  		expect(nextState).to.equal(fromJS({
   			vote: {
   				round: 43,
      			pair: ['Kevin Durant', 'Russell Westbrook']
    		}
  		}));
	});

	it('handles SET_CLIENT_ID', () => {
		const initialState = Map();
		const action = {
			type: 'SET_CLIENT_ID',
			clientId: '1234'
		}
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			clientId: '1234'
		}));
	})
})