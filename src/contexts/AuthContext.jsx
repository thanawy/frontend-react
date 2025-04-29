import { createContext } from "react";

export let AuthContext = createContext(null);

export default function AuthProvider(props) {
let x = 0;


  return( <AuthContext.Provider value={{x}}>{props.children}</AuthContext.Provider>);
}
