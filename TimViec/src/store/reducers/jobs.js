import { SET_JOBS } from '../actions/jobs';
import Jobs from '../../models/jobs';

const initialState = {
   availableJobs: [],
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SET_JOBS:
         return {
            availableJobs: action.jobs,
         };
   }
   return state;
}