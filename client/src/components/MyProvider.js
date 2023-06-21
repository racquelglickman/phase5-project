import { useState, useEffect, createContext } from "react"
import Login from "./Login";

export const MyContext = createContext()

function MyProvider({ children }) {
    
    // auto login authetication
    const [user, setUser] = useState(null)

    useEffect(() => {
        // auto-login
        fetch("/check_session").then((res) => {
        if (res.ok) {
            res.json().then((user) => setUser(user));
        }
        });
    }, []);

    if (!user) return <Login onLogin = {setUser}/>;

    return (
        <MyContext.Provider 
            value={({user: user, setUser: setUser})}
        >
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider