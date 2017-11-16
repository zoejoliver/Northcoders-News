import {expect} from 'chai';
import commentReducer, {getInitialState} from '../src/reducers/comments';
import * as actionCreators from '../src/actions';

describe('commentReducer', () => {
    describe('default behaviour', () => {
        it('returns the passed previous state if an unrecognised action is passed', () => {
            const prevState = getInitialState();
            const action = {type: 'whatever'};
            const newState = commentReducer(prevState, action);
            expect(newState).to.equal(prevState);
        });
        it('uses the initial state if no previous state is passed', () => {
            const action = {type: 'whatever'};
            const newState = commentReducer(undefined, action);
            expect(newState).to.eql(getInitialState()); 
        });
    });
    describe('fetchComments actions', () => {
        it('handles FETCH_COMMENTS_REQUEST', () => {
            const prevState = getInitialState();
            const action = actionCreators.fetchCommentRequest();
            const newState = commentReducer(prevState, action);
            expect(newState.loading).to.equal(true);
            expect(newState.data).to.eql([]);
            expect(newState.error).to.equal(null);
        });
        it('handles FETCH_COMMENTS_SUCCESS', () => {
            const data = [3,6,9,12];
            const prevState = getInitialState();
            const action = actionCreators.fetchCommentSuccess(data);
            const newState = commentReducer(prevState, action);
            expect(newState.loading).to.equal(false);
            expect(newState.data).to.eql(data);
            expect(newState.error).to.equal(null);
        });
        it('handles FETCH_COMMENTS_FAILURE', () => {
            const err = 'something went wrong';
            const prevState = getInitialState();
            const action = actionCreators.fetchCommentFailure(err);
            const newState = commentReducer(prevState, action);
            expect(newState.loading).to.equal(false);
            expect(newState.data).to.eql([]);
            expect(newState.error).to.equal(err);
        });
    });
})