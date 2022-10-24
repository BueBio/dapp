import React, { useContext, useMemo, useReducer } from 'react';
import rlogin from '../utils/rlogin';

const ContextRLogin = React.createContext();

function rloginReducer(state, action) {
  switch (action.type) {
    case 'setDataGeneral':
      return {
        ...state,
        disconnect: action.value.disconnect,
        address: action.value.address,
        provider: action.value.provider,
        networkId: action.value.networkId,
      };
    default:
      throw new Error(`Unexpected action ${action.type}`);
  }
}

const ContextProviderRLogin = function ({ children }) {
  const [state, dispatch] = useReducer(rloginReducer, {
    rlogin,
    disconnect: () => {},
    address: '',
    provider: null,
    networkId: null,
  });

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ContextRLogin.Provider value={contextValue}>
      {children}
    </ContextRLogin.Provider>
  );
};

const useRLogin = function () {
  const context = useContext(ContextRLogin);
  if (!context) {
    throw new Error('useRLogin must be used within a ContextProviderRLogin');
  }
  return context;
};

export {
  ContextProviderRLogin,
  useRLogin,
};
