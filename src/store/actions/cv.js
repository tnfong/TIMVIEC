import Env from "../../firebase/config";
import CV from "../../models/cv"

export const ADD_CV = "ADD_CV";
export const SET_CV = "SET_CV";
export const DELETE_CV = "DELETE_CV";


export const fetchCV = () => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      try {
        const response = await fetch(`${Env.url}cv.json?auth=${token}`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const resData = await response.json();
        const loadedCV = [];
        for (const key in resData) {
          loadedCV.push(
            new CV(
              key,
              resData[key].uid,
              resData[key].doc,
            )
          );
        }
  
        dispatch({ type: SET_CV, cv: loadedCV.filter(cv => cv.uid === userId)  });
      } catch (err) {
        throw err;
      }
    };
  };
  
  export const addCV = (doc) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const uid = getState().auth.userId;
      const response = await fetch(
        `${Env.url}cv.json?auth=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: uid,
            doc: doc
          })
        }
      );
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      const resData = await response.json();
  
      dispatch({
        type: ADD_CV,
        docData: {
          id: resData.name,
          uid: uid,
          doc: doc, 
        }
      });
    };
  };

  export const deleteCV = (id) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const response = await fetch(
        `${Env.url}cv/${id}.json?auth=${token}`,//?auth=${token}
        {
          method: "DELETE"
        }
      );
  
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
  
      dispatch({
        type: DELETE_CV,
        pid: id
      });
    };
  };
  
  