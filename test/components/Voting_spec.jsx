import {Voting} from '../../src/components/Voting';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  	renderIntoDocument,
  	scryRenderedDOMComponentsWithTag,
  	Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {List} from 'immutable';

describe('Voting', () => {

	it('renders a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair={["Russell Westbrook", "James Harden"]} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
    	expect(buttons[0].textContent).to.equal('Russell Westbrook');
    	expect(buttons[1].textContent).to.equal('James Harden');
	});

	it('disables buttons when user has voted', () => {
		const component = renderIntoDocument(
			<Voting pair={["Russell Westbrook", "James Harden"]}
					hasVoted="Russell Westbrook" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
  		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
  		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to the voted entry', () => {
		const component = renderIntoDocument(
			<Voting pair={["Russell Westbrook", "James Harden"]}
					hasVoted="Russell Westbrook" />

		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders just the winner', () => {
		const component = renderIntoDocument(
			<Voting winner="Russell Westbrook" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Russell Westbrook');
	});

	it('renders as a pure component', () => {
  		const pair = ['Russell Westbrook', 'James Harden'];
  		const container = document.createElement('div');
  		let component = ReactDOM.render(
    		<Voting pair={pair} />,
    		container
  		);

  		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  		expect(firstButton.textContent).to.equal('Russell Westbrook');

  		pair[0] = 'Kevin Durant';
  		component = ReactDOM.render(
    		<Voting pair={pair} />,
    		container
  		);
  		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  		expect(firstButton.textContent).to.equal('Russell Westbrook');
	});

	it('does update DOM when prop changes', () => {
	    const pair = List.of('Russell Westbrook', 'James Harden');
	    const container = document.createElement('div');
	    let component = ReactDOM.render(
	      <Voting pair={pair} />,
	      container
	    );

	    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	    expect(firstButton.textContent).to.equal('Russell Westbrook');

	    const newPair = pair.set(0, 'Kevin Durant');
	    component = ReactDOM.render(
	      <Voting pair={newPair} />,
	      container
	    );
	    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	    expect(firstButton.textContent).to.equal('Kevin Durant');
  	});
  	
});