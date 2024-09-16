<script setup>
import { ref, watch } from 'vue';
import { useFetch } from '@/composables/useFetch';

const id = ref(1);
const endpoint = ref(`/products/${id.value}`);
const { data: product, error, isLoading } = useFetch(endpoint);

watch(id, () => {
  endpoint.value = `/products/${id.value}`;
});

const nextProduct = () => {
  id.value += 1;
};

const prevProduct = () => {
  if (id.value > 1) {
    id.value -= 1;
  }
};

// const test = ref(null);

// const testLoading = () => {
//   test.value = 'loading';
//   setTimeout(() => {
//     test.value = null;
//   }, 2000);
// };

// const testError = () => {
//   test.value = 'error';
//   setTimeout(() => {
//     test.value = null;
//   }, 2000);
// };
</script>

<template>
  <main
    class="bg-man-secondary flex justify-center items-center min-h-screen relative"
  >
    <div class="bg-white flex w-full h-[30vh] absolute bottom-0 z-0"></div>
    <div
      class="bg-white z-10 flex flex-col justify-center items-center w-[70vw] h-[80vh] p-10 rounded-xl shadow-xl"
    >
      <!-- <div v-if="test === 'loading'">Loading...</div>
      <div v-else-if="test === 'error'" class="text-red-500">
        Error: {{ error }}
      </div> -->
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else="product">
        <div class="grid grid-cols-detail justify-between">
          <div class="flex justify-center items-center w-full">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-[400px] h-[600px] object-contain"
            />
          </div>
          <div class="grid grid-rows-detail">
            <div class="flex flex-col justify-end">
              <h3>{{ product.title }}</h3>
            </div>
            <div
              class="flex flex-row justify-between items-center my-2 border-b"
            >
              <h4>{{ product.category }}</h4>
              <div class="flex flex-row items-center gap-2">
                <h4>{{ product.rating.rate }} / 5</h4>
                <div
                  v-for="index in 5"
                  :key="index"
                  class="rounded-full border border-primary w-5 h-5"
                  :class="{ 'bg-primary': index < product.rating.rate }"
                ></div>
              </div>
            </div>
            <div class="flex items-self-start">
              <p>{{ product.description }}</p>
            </div>
            <div class="flex flex-col justify-end my-2 border-t">
              <h3>${{ product.price }}</h3>
            </div>
            <div class="flex flex-row items-start gap-5">
              <button
                @click="prevProduct"
                class="btn btn-secondary w-2/5"
                :disabled="id === 1"
              >
                Prev
              </button>
              <button @click="nextProduct" class="btn btn-primary w-2/5">
                Next
              </button>
            </div>
            <!-- <div class="flex flex-row gap-4 mt-4">
              <button @click="testLoading" class="btn btn-secondary">
                Test Loading
              </button>
              <button @click="testError" class="btn btn-primary">
                Test Error
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
