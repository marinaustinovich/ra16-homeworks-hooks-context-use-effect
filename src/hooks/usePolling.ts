import { useEffect, useState } from "react";

function usePolling<T>(url: string, initialData:T | undefined = undefined) {
  const [data, setData] = useState<T | undefined>(initialData);
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
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);
  
  return { data, isLoading, error };
}

export default usePolling;
