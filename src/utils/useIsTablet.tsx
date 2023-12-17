import { useEffect, useState } from "react"; 
  
const useIsTablet = () => { 
    const [width, setWidth] = useState(0); 
    const handleWindowSizeChange = () => { 
        setWidth(window.innerWidth); 
    }; 
  
    useEffect(() => { 
        handleWindowSizeChange(); 
  
        /* Inside of a "useEffect" hook add  
           an event listener that updates 
           the "width" state variable when  
           the window size changes */
        window.addEventListener("resize",  
            handleWindowSizeChange); 
  
        // Return a function from the effect  
        // that removes the event listener 
        return () => { 
            window.removeEventListener( 
                "resize", handleWindowSizeChange); 
        }; 
    }, []); 
  
    return width <= 1280; 
}; 
  
export default useIsTablet; 