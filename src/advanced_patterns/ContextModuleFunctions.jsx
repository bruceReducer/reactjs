import { createContext, useContext, useReducer, useState } from "react";
import { useAuthCMF } from "./useAuthCMF";
import { dequal } from "dequal";
const sleep = (t) => new Promise((p) => setTimeout(p, t));

async function updateUser(user, updates, signal) {
  await sleep(500);
  if (`${updates.tagline} ${updates.bio}`.includes("fail")) {
    return Promise.reject({ message: "Something went wrong" });
  }
  return { ...user, ...updates };
}
// this is just a fake user client, in reality it'd probably be using
// window.fetch to actually interact with the user.

const UserCtx = createContext();
const useUser = () => {
  const ctx = useContext(UserCtx);
  return ctx;
};
function userReducer(state, action) {
  switch (action.type) {
    case "start update":
      return {
        ...state,
        user: { ...state.user, ...action.updates },
        storedUser: state.user,
      };
    case "reset":
      return {
        ...state,
        status: null,
        error: null,
      };
    case "finish update": {
      return {
        ...state,
        user: action.updatedUser,
        status: "resolved",
        storedUser: null,
        error: null,
      };
    }
    case "fail update": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
        user: state.storedUser,
        storedUser: null,
      };
    }
  }
}

function UserProvider({ children }) {
  const { user } = useAuthCMF();

  const [state, dispatch] = useReducer(userReducer, {
    status: null,
    error: null,
    storedUser: user,
    user,
  });
  const value = [state, dispatch];
  return <UserCtx.Provider value={value}>{children}</UserCtx.Provider>;
}
async function updateUserDispatch(dispatch, user, updates) {
  dispatch({ type: "start update", updates });
  try {
    const updatedUser = await updateUser(user, updates);
    dispatch({ type: "finish update", updatedUser });
    return updatedUser;
  } catch (error) {
    dispatch({ type: "fail update", error });
    return Promise.reject(error);
  }
}
// TODO: make this a real request with fetch so the signal does something
// export {UserProvider, useUser, updateUser}

// src/screens/user-profile.js
// import {UserProvider, useUser, updateUser} from './context/user-context'
function UserDataDisplay() {
  const [{ user, storedUser }] = useUser();
  console.log(storedUser ? storedUser : null);

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>;
    </>
  );
}
function UserSettings() {
  const [{ user, status, error }, userDispatch] = useUser();
  const [formState, setFormState] = useState(user);
  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    updateUserDispatch(userDispatch, user, formState).catch(() => {});
  }
  const isPending = status === "pending";
  const isRejected = status === "rejected";
  const isChanged = !dequal(user, formState);
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block" }} htmlFor="bio">
          Biography
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setFormState(user);
            userDispatch({ type: "reset" });
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button type="submit" disabled={(!isChanged && !isRejected) || isPending}>
          {isPending ? "..." : isRejected ? "✖ Try again" : isChanged ? "Submit" : "✔"}
        </button>
        {isRejected ? <pre style={{ color: "red" }}>{error.message}</pre> : null}
      </div>
    </form>
  );
}

function ContextModuleFunctions() {
  return (
    <div>
      <h2>ContextModuleFunctions</h2>
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  );
}

export default ContextModuleFunctions;
