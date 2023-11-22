import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: {},
    token: null,
    questionTypes: [],
    toast: {
      message: null,
      show: false
    },
    showToast: () => {},
    setUser: () => {},
    setToken: () => {},
})

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [questionTypes] = useState(['text','select','radio', 'checkbox', 'textarea']);
    const [toast, setToast] = useState({
      message: '',
      show: false
    });
    function showToast(message) {
      setToast({
        message,
        show: true
        })
      setTimeout(() => {
        setToast({
          message: '',
          show: false
          })          
        }, 5000);
    }
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return(
        <StateContext.Provider value={
            {
                user,
                token,
                toast,
                setUser,
                setToken,
                showToast,
                questionTypes,
            }
        }>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext);