import React, { useState } from "react";

const AppContext = React.createContext([{}, () => {}]);

const AppContextProvider = props => {
  const initialState = {
    isSignedIn: false,
    articles: [],
    tags:[]
  };
  const [state, setState] = useState(initialState);
  return (
    <AppContext.Provider value={[state, setState]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
