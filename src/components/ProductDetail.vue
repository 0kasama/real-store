<script setup>
import ProductNotFound from './ProductNotFound.vue';
import ProductLoading from './ProductLoading.vue';
import { ref, onMounted, computed } from 'vue';

const id = ref(1);
const totalProduct = ref(20);
console.log('total',totalProduct);
const product = ref(null);
const error = ref(null);
const isLoading = ref(true);
const rating = computed(() => product.value?.rating?.rate || 0);

const getTotalProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    totalProduct.value = products.length;
  } catch (err) {
    throw err;
  }
};

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

onMounted(async () => {
  await getTotalProducts();
  fetchData();
});

const nextProduct = () => {
  if (id.value >= totalProduct.value) {
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
      <ProductLoading v-if="isLoading" />

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
          <div class="card-title">
            <h1
              :class="{
                'text-man': product.category === 'men\'s clothing',
                'text-woman': product.category !== 'men\'s clothing',
              }"
            >
              {{ product.title }}
            </h1>
          </div>
          <div class="category">
            <h2>{{ product.category }}</h2>
            <div class="rating">
              <h2>{{ rating }} / 5</h2>
              <div
                v-for="index in 5"
                :key="index"
                class="circle"
                :class="{
                  'circle-man':
                    index < rating && product.category === 'men\'s clothing',
                  'circle-woman':
                    index < rating && product.category !== 'men\'s clothing',
                }"
              ></div>
            </div>
          </div>
          <div class="description">
            <p>{{ product.description }}</p>
          </div>
          <div class="product-price">
            <h1
              :class="{
                'text-man': product.category === 'men\'s clothing',
                'text-woman': product.category !== 'men\'s clothing',
              }"
            >
              ${{ product.price }}
            </h1>
          </div>
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
