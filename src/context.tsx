import React from 'react';

export const Context = React.createContext<any>(undefined);
export const UIProvider: React.FC = ({children}) => {
    const [testState, setTestState] = React.useState(false);
    let state = {testState, setTestState};
    return <Context.Provider value={state}>{children}</Context.Provider>;
};
export default Context;
