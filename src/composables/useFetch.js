import { ref, watch, isRef } from 'vue';
import { BASE_URL } from '@/config/baseUrl';

export function useFetch(endpoint, options = {}) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(true);

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    data.value = null;

    const url = isRef(endpoint)
      ? `${BASE_URL}${endpoint.value}`
      : `${BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      data.value = result;
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  if (isRef(endpoint)) {
    watch(endpoint, fetchData);
  } else {
    fetchData();
  }

  return { data, error, isLoading };
}
