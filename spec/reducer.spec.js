import {expect} from 'chai';
import reducer, {getInitialState} from '../src/reducers/test';
import * as actionCreators from '../src/actions';

describe('reducer', () => {
    describe('default behaviour', () => {
        it('returns the passed previous state if an unrecognised action passed', () => {
            const prevState = getInitialState();
            const action = {type: 'whatever'};
            const newState = reducer(prevState, action);
            expect(newState).to.equal(prevState);
        });
        it('uses the intitial state if no previous state given', () => {
            const action = {type: 'whatever'};
            const newState = reducer(undefined, action);
            expect(newState).to.eql(getInitialState());
        });
    });
    describe('handles TOGGLE_TEST action', () => {
        it('flips the state.test boolean', () => {
            let newState;
            const action = actionCreators.toggleTest();
            newState = reducer(undefined, action);
            expect(newState.test).to.be.true;
            newState = reducer(newState, action);
            expect(newState.test).to.be.false;
        });
    });
})