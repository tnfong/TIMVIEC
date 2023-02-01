import Env from "../../firebase/config";
import AppliedJobs from "../../models/appliedjobs";

export const ADD_APPLIED = "ADD_APPLIED";
export const SET_APPLIED = "SET_APPLIED";

export const fetchAppliedJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`${Env.url}appliedjobs/${userId}.json?auth=${token}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedAppliedJobs = [];
      for (const key in resData) {
        loadedAppliedJobs.push(
          new AppliedJobs(
            key,
            resData[key].jobid,
            new Date(resData[key].date),
            resData[key].title,
            resData[key].imageUrl,
            resData[key].time,
            resData[key].salary
          )
        );
      }

      dispatch({ type: SET_APPLIED, appliedjobs: loadedAppliedJobs });
    } catch (err) {
      throw err;
    }
  };
};

export const addAppliedJobs = (jobid, title, imageUrl, time, salary) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `${Env.url}appliedjobs/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobid,
          date: date.toDateString(),
          title, 
          imageUrl, 
          time, 
          salary
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_APPLIED,
      appliedjobsData: {
        id: resData.name,
        jobid: jobid,
        date: date,
        title: title,
        imageUrl: imageUrl,
        time: time,
        salary: salary
      }
    });
  };
};
