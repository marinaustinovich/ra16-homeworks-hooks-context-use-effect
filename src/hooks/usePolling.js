import { useEffect, useState } from 'react';

const usePolling = (url, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            const data = await response.json();
            setData(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
        };

    fetchData();
    }, [url]);
    return { data, isLoading, error };
};

export default usePolling;
