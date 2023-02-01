import Env from "../../firebase/config";
import SavedJobs from "../../models/savedjobs";

export const ADD_SAVED = "ADD_SAVED";
export const SET_SAVED = "SET_SAVED";
export const DELETE_SAVED = "DELETE_SAVED";

export const fetchSavedJobs = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`${Env.url}savedjobs/${userId}.json?auth=${token}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedSavedJobs = [];
      for (const key in resData) {
        loadedSavedJobs.push(
          new SavedJobs(
            key,
            resData[key].jobid,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].time,
            resData[key].salary
          )
        );
      }

      dispatch({ type: SET_SAVED, savedjobs: loadedSavedJobs });
    } catch (err) {
      throw err;
    }
  };
};

export const addSavedJobs = (jobid, title, imageUrl, time, salary) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${Env.url}savedjobs/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobid,
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
      type: ADD_SAVED,
      savedjobsData: {
        id: resData.name,
        jobid: jobid,
        title: title,
        imageUrl: imageUrl,
        time: time,
        salary: salary
      }
    });
  };
};

export const unSaved = (sid) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `${Env.url}savedjobs/${id}.json?auth=${token}`,//?auth=${token}
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: DELETE_SAVED,
      sid: sid
    });
  };
};
