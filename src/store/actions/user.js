import Env from "../../firebase/config";
import User from "../../models/user"

export const ADD_USER = "ADD_USER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(`${Env.url}user.json?auth=${token}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedUser = [];
      for (const key in resData) {
        loadedUser.push(
          new User(
            key,
            resData[key].uid,
            resData[key].pic,
            resData[key].name,
            resData[key].gender,
            resData[key].dob,
            resData[key].pob,
            resData[key].cmnd,
            resData[key].dd,
            resData[key].diplo,
            resData[key].quali,
            resData[key].email,
            resData[key].phone,
          )
        );
      }

      dispatch({ type: SET_USER, user: loadedUser.filter(useri => useri.uid === userId)  });
    } catch (err) {
      throw err;
    }
  };
};

export const addUser = (pic, name, gender, dob, pob, cmnd, dd, diplo, quali, email, phone) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${Env.url}user.json?auth=${token}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: userId, 
            pic, 
            name, 
            gender, 
            dob, 
            pob, 
            cmnd, 
            dd, 
            diplo, 
            quali,
            email,
            phone
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_USER,
      user1Data: {
        id: resData.name,
        uid: userId, 
        pic: pic, 
        name: name, 
        gender: gender, 
        dob: dob, 
        pob: pob, 
        cmnd: cmnd, 
        dd: dd, 
        diplo: diplo, 
        quali: quali,
        email: email,
        phone: phone
      }
    });
  };
};


export const updateUser = (id, pic, name, gender, dob, pob, cmnd, dd, diplo, quali, email, phone) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `${Env.url}user/${id}.json`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({pic, name, gender, dob, pob, cmnd, dd, diplo, quali, email, phone})
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi xảy ra!");
    }

    dispatch({
      type: UPDATE_USER,
      pid: id,
      user1Data: { pic, name, gender, dob, pob, cmnd, dd, diplo, quali, email, phone}
    });
  };
};
