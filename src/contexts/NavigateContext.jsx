import { createContext, useContext } from 'react';

const NavigateContext = createContext(null);

export const NavigateProvider = ({ navigate, children }) => {
  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  );
};

export const useNavigate = () => {
  const context = useContext(NavigateContext);
  if (!context) {
    throw new Error('useNavigate must be used within a NavigateProvider');
  }
  return context;
};
