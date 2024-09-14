import { ref, watch, isRef, onMounted } from 'vue';
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

  onMounted(fetchData);

  if (isRef(endpoint)) {
    watch(endpoint, fetchData);
  }

  return { data, error, isLoading };
}
