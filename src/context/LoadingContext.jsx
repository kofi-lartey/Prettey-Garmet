import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Show loader on initial page load
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const startLoading = useCallback(() => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsLoading(true);
    }, []);

    const stopLoading = useCallback(() => {
        // Add minimum loading time of 800ms for better UX
        timeoutRef.current = setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};
