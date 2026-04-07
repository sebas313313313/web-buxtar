import { useState, useEffect, useCallback } from 'react';
import api from '../config/api';

// Hook personalizado para peticiones a la API
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        url,
        ...options,
      });

      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error en la petición');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData, url]);

  const refetch = useCallback(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData, url]);

  return { data, loading, error, refetch };
};

// Hook para mutations (POST, PUT, DELETE)
export const useMutation = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (requestData, requestOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        url,
        method: 'POST',
        data: requestData,
        ...options,
        ...requestOptions,
      });

      setData(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error en la petición';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, mutate, reset };
};
