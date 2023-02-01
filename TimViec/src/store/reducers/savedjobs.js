import { ADD_SAVED, SET_SAVED, DELETE_SAVED } from "../actions/savedjobs";
import SavedJobs from "../../models/savedjobs";

const initialState = {
   savedjobs: []
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SET_SAVED:
         return {
            savedjobs: action.savedjobs
         }
      case ADD_SAVED:
         const newSavedJobs = new SavedJobs(
            action.savedjobsData.id,
            action.savedjobsData.jobid,
            action.savedjobsData.title,
            action.savedjobsData.imageUrl,
            action.savedjobsData.time,
            action.savedjobsData.salary
         );
         return {
            ...state,
            savedjobs: state.savedjobs.concat(newSavedJobs)
         };
      case DELETE_SAVED:
         return {
            ...state,
            savedjobs: state.savedjobs.filter(
               savedjobs => savedjobs.id !== action.sid
            )
         };

   }

   return state
}