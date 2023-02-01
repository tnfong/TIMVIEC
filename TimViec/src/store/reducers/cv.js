import { ADD_CV, SET_CV, DELETE_CV} from "../actions/cv";
import CV from "../../models/cv";

const initialState = {
   cv: []
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SET_CV:
         return {
            cv: action.cv
         }
      case ADD_CV:
         const newCV = new CV(
            action.docData.id,
            action.docData.uid,
            action.docData.doc, 
         );
         return {
            ...state,
            cv: state.cv.concat(newCV)
         };
      case DELETE_CV:
         return {
            ...state,
            cv: state.cv.filter(
               cv => cv.id !== action.pid
            )
         };


   }

   return state
}