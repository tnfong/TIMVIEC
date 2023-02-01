import { ADD_APPLIED, SET_APPLIED } from "../actions/appliedjobs";
import AppliedJobs from "../../models/appliedjobs";

const initialState = {
   appliedjobs: []
};

export default (state = initialState, action) => {
   switch (action.type) {
      case SET_APPLIED:
         return {
            appliedjobs: action.appliedjobs
         }
      case ADD_APPLIED:
         const newAppliedJobs = new AppliedJobs(
            action.appliedjobsData.id,
            action.appliedjobsData.jobid,
            action.appliedjobsData.date,
            action.appliedjobsData.title,
            action.appliedjobsData.imageUrl,
            action.appliedjobsData.time,
            action.appliedjobsData.salary
         );
         return {
            ...state,
            appliedjobs: state.appliedjobs.concat(newAppliedJobs)
         };

   }

   return state
}