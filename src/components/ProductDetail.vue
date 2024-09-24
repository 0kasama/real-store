<script setup>
import ProductNotFound from './ProductNotFound.vue';
import { ref, onMounted } from 'vue';

const id = ref(1);
const maxId = 20;
const product = ref(null);
const error = ref(null);
const isLoading = ref(true);

const fetchData = async () => {
  isLoading.value = true;
  error.value = null;
  product.value = null;

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${id.value}`
    );
    const result = await response.json();
    product.value = result;

    const category = product.value.category;
    if (category !== "men's clothing" && category !== "women's clothing") {
      error.value = 'This product is unavailable to show';
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const nextProduct = () => {
  if (id.value >= maxId) {
    id.value = 1;
  } else {
    id.value += 1;
  }
  fetchData();
};
</script>

<template>
  <main
    class="bg-main"
    :class="{
      'bg-man': product && product.category === 'men\'s clothing',
      'bg-woman': product && product.category === 'women\'s clothing',
    }"
  >
    <div class="bg-main-under"></div>
    <div class="card">
      <div v-if="isLoading">Loading...</div>

      <ProductNotFound
        v-else-if="error"
        :error="error"
        :nextProduct="nextProduct"
        :id="id"
      />

      <div v-else="product" class="card-product">
        <div class="card-image">
          <img :src="product.image" :alt="product.title" />
        </div>
        <div class="card-details">
          <h1
            :class="{
              'text-man': product.category === 'men\'s clothing',
              'text-woman': product.category !== 'men\'s clothing',
            }"
          >
            {{ product.title }}
          </h1>
          <div class="category">
            <h2>{{ product.category }}</h2>
            <div class="rating">
              <h2>{{ product.rating.rate }} / 5</h2>
              <div
                v-for="index in 5"
                :key="index"
                class="circle"
                :class="{
                  'circle-man':
                    index < product.rating.rate &&
                    product.category === 'men\'s clothing',
                  'circle-woman':
                    index < product.rating.rate &&
                    product.category !== 'men\'s clothing',
                }"
              ></div>
            </div>
          </div>
          <div class="description">
            <p>{{ product.description }}</p>
          </div>
          <h1
            :class="{
              'text-man': product.category === 'men\'s clothing',
              'text-woman': product.category !== 'men\'s clothing',
            }"
          >
            ${{ product.price }}
          </h1>
          <div class="button">
            <button
              class="btn"
              :class="{
                'btn-man': product.category === 'men\'s clothing',
                'btn-woman': product.category !== 'men\'s clothing',
              }"
            >
              Buy Now
            </button>
            <button
              @click="nextProduct"
              class="btn btn-outline"
              :class="{
                'btn-man': product.category === 'men\'s clothing',
                'btn-woman': product.category !== 'men\'s clothing',
              }"
            >
              Next Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
