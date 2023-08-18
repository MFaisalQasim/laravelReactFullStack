import { createContext,useContext,useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    // setNotification: null,
    // token: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
})

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState( {
        name: 'Muhammad',
        email: 'Muhammad@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      });
    const [notification, _setNotification] = useState(localStorage.getItem('ACCESS_NOTIFICATION'));
    // const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [token, _setToken] = useState('ACCESS_TOKEN');

    const setNotification = (message) => {

        _setNotification(message)
        setTimeout(() => {
        _setNotification('')
            
        }, 5000);
    }
    const setToken = (token) => {

        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    
    return(
        <StateContext.Provider value={
            {
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
            }
        }>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);