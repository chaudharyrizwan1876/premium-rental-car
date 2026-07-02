import { useState, useEffect, useCallback } from "react";

/**
 * Generic async data hook with loading/error states.
 * `fetcher` should be a stable function reference (wrap it in useCallback
 * in the calling component, or define it outside the component body).
 * Call `refetch()` to manually re-run the fetcher (e.g. after a mutation).
 */
export function useFetch(fetcher) {
  const [state, setState] = useState({ data: null, isLoading: true, error: null });
  const [refetchToken, setRefetchToken] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const result = await fetcher();
        if (isMounted) setState({ data: result, isLoading: false, error: null });
      } catch (err) {
        if (isMounted) {
          setState({
            data: null,
            isLoading: false,
            error: err.message || "Failed to load data",
          });
        }
      }
    }

    run();

    return () => {
      isMounted = false;
    };
  }, [fetcher, refetchToken]);

  const refetch = useCallback(() => setRefetchToken((t) => t + 1), []);

  return { ...state, refetch };
}
