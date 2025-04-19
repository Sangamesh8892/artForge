import { createContext, use } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";



export const AppContext = createContext();


const AppContextProvider = (props) => {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate()  
    const [credit,setCredit] = useState(false);
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const loadCreditsData= async () =>{
        try{
            const {data}= await axios.get(`${backendUrl}/api/user/credits`,{headers:{token}})
            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        }catch(error){
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const generateImage = async(prompt) => {
        try {
            // First check if we already know credits are zero
            if (credit === 0) {
                toast.info("You're out of credits. Redirecting to purchase page...");
                setTimeout(() => {
                    navigate('/buycredit');
                }, 1000);
                return null;
            }
            
            const {data} = await axios.post(
                `${backendUrl}/api/image/generate-image`,
                {prompt, userId},
                {headers: {token}}
            );
            
            if(data.success) {
                loadCreditsData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCreditsData();
                
                // Use strict equality check and verify property exists
                if(data.creditBalance !== undefined && data.creditBalance === 0) {
                    toast.info("You're out of credits. Redirecting to purchase page...");
                    setTimeout(() => {
                        navigate('/buycredit');
                    }, 1000);
                    return null;
                }
                return null;
            }
        } catch(error) {
            console.error("API Error:", error.response?.data || error.message);
            
            // Check for credit-related error message
            if(error.response?.data?.message === "Insufficient credits" || 
               error.response?.status === 403) {
                toast.info("You're out of credits. Redirecting to purchase page...");
                setTimeout(() => {
                    navigate('/buycredit');
                }, 1000);
            } else {
                toast.error(error.response?.data?.message || error.message);
            }
            return null;
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setCredit(false)
        setUserId(null)
    }
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            try {
                // Extract userId from JWT token
                const payload = savedToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                setUserId(decodedPayload.id); // Set userId from token
            } catch (err) {
                console.error("Error parsing token:", err);
            }
        }
    }, []);

    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        setToken,
        token,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage,
    };
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;