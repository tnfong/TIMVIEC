import { ADD_USER, SET_USER, UPDATE_USER} from "../actions/user";
import User from "../../models/user";

const initialState = {
   user: []
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SET_USER:
         return {
            user: action.user
         }
      case ADD_USER:
         const newUser = new User(
            action.user1Data.id,
            action.user1Data.userid, 
            action.user1Data.pic, 
            action.user1Data.name, 
            action.user1Data.gender, 
            action.user1Data.dob, 
            action.user1Data.pob, 
            action.user1Data.cmnd, 
            action.user1Data.dd, 
            action.user1Data.diplo, 
            action.user1Data.quali,
            action.user1Data.email,
            action.user1Data.phone
         );
         return {
            ...state,
            user: state.user.concat(newUser)
         };
      case UPDATE_USER:
         const userIndex1 = state.user.findIndex(
            user => user.id === action.pid
         );
         const updatedUser = new User(
            action.pid,
            state.user[userIndex1].uid,
            action.user1Data.pic, 
            action.user1Data.name, 
            action.user1Data.gender, 
            action.user1Data.dob, 
            action.user1Data.pob, 
            action.user1Data.cmnd, 
            action.user1Data.dd, 
            action.user1Data.diplo, 
            action.user1Data.quali,
            action.user1Data.email,
            action.user1Data.phone
         );
         return {
            ...state,
            user: state.user.concat(updatedUser)
         };


   }

   return state
}