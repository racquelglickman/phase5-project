import { useState, useEffect, createContext } from "react"

export const MyContext = createContext()

function MyProvider({ children }) {
    
    


    // // auto login authetification
    // const [user, setUser] = useState(null)

    // useEffect(() => {
    //     // auto-login
    //     fetch("/check_session").then((r) => {
    //     if (r.ok) {
    //         r.json().then((user) => setUser(user));
    //     }
    //     });
    // }, []);

    // if (!user) return <Login onLogin= {setUser}/>;

    return (
        <MyContext.Provider>
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider