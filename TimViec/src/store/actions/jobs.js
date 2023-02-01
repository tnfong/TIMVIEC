import Jobs from "../../models/jobs"
import Env from "../../firebase/config";


export const SET_JOBS = "SET_JOBS";

export const fetchJobs = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${Env.url}jobs.json`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      console.log(resData)
      const loadedJobs = [];
      for (const key in resData) {
        loadedJobs.push(
          new Jobs(
            key,
            resData[key].company,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].requirement,
            resData[key].language,
            resData[key].time,
            resData[key].type,
            resData[key].salary,
            resData[key].req_eng,
            resData[key].req_gen,
            resData[key].contact,
            resData[key].location,
            resData[key].city,
            resData[key].comid
          )
        );
      }
      console.log(loadedJobs)
      dispatch({
        type: SET_JOBS,
        jobs: loadedJobs,
      });
    } catch (error) {
      throw error;
    }
  };
};


