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

    const [selectedTrip, setSelectedTrip] = useState();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/categories')
            .then((res) => res.json())
            .then((data) => {
                setCategories(data)
            })
    }, [])

    if (!user) return <Login onLogin = {setUser}/>;

    return (
        <MyContext.Provider 
            value={({user: user, setUser: setUser, categories: categories, selectedTrip: selectedTrip, setSelectedTrip: setSelectedTrip})}
        >
            {children}
        </MyContext.Provider>
    )
}

export default MyProvider