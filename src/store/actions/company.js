import Company from "../../models/company";
import Env from "../../firebase/config";


export const SET_COMPANY = "SET_COMPANY";

export const fetchCompany = () => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch(`${Env.url}company.json`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const resData = await response.json();
        const loadedCompany = [];
        for (const key in resData) {
          loadedCompany.push(
            new Company(
              key,
              resData[key].title,
              resData[key].imageUrl,
              resData[key].about,
              resData[key].scale,
              resData[key].location,
              resData[key].website
            )
          );
        }
        dispatch({
          type: SET_COMPANY,
          company: loadedCompany,
        });
      } catch (error) {
        throw error;
      }
    };
  };