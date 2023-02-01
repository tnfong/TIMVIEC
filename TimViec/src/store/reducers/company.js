import { SET_COMPANY } from '../actions/company';
import Jobs from '../../models/jobs';

const initialState = {
   company:[]
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SET_COMPANY:
         return {
            company: action.company,
         };
   }
   return state;
}