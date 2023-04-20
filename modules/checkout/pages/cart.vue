<template>
  <div class="container my-12">
    <div v-if="!cartIsEmpty">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-9">
          <div class="border rounded-xl">
            <div
              class="p-2 lg:p-5 border-b-2"
              v-for="(item, index) in cart?.cart_items"
              :key="index"
            >
              <div class="grid grid-cols-12 gap-2 lg:gap-4">
                <div class="col-span-4 lg:col-span-2">
                  <nuxt-link
                    :to="{
                      name: 'products-show',
                      params: {
                        id: item?.product.id,
                        slug: item?.product.slug,
                      },
                    }"
                  >
                    <div class="lg:h-28 lg:w-28">
                      <img
                        class="object-contain w-full"
                        :src="item?.product.media?.thumb"
                        alt=""
                      />
                    </div>
                  </nuxt-link>
                </div>

                <div class="col-span-8 lg:col-span-10">
                  <h4 class="text-gray-700 text-sm lg:text-xl">
                    {{ item?.product.title_fa }}
                  </h4>

                  <div class="flex flex-col lg:flex-row lg:items-center my-4">
                    <div
                      class="flex items-center lg:mr-2"
                      v-for="(combination, index) in item?.variant
                        ?.combinations"
                    >
                      <nuxt-icon
                        name="cube-scan-bulk"
                        class="w-6 h-6"
                      ></nuxt-icon>

                      <span class="mr-2 text-gray-500 text-sm">{{
                        combination.label
                      }}</span>
                    </div>

                    <div class="flex items-center lg:mr-2">
                      <span class="">
                        <nuxt-icon
                          class="text-gray-500 w-6 h-6 lg:w-6 lg:h-6"
                          name="shield-tick"
                        ></nuxt-icon>
                      </span>
                      <span class="mr-2 text-gray-500 text-sm">
                        {{ item?.variant.warranty?.title }}
                      </span>
                    </div>

                    <div class="flex items-center lg:mr-2">
                      <span class="">
                        <nuxt-icon
                          class="text-gray-500 w-6 h-6 lg:w-6 lg:h-6"
                          name="shop"
                        ></nuxt-icon>
                      </span>
                      <span class="mr-2 text-gray-500 text-sm">فالکون</span>
                    </div>

                    <!-- <div class="flex items-center lg:mr-2">
                        <span class="">
                          <nuxt-icon
                            class="text-gray-500 w-6 h-6 lg:w-6 lg:h-6"
                            name="user"
                          ></nuxt-icon>
                        </span>
                        <span class="mr-2 text-gray-500 text-sm">
                          {{ item?.variant.shipment?.title }}
                        </span>
                      </div> -->
                  </div>
                </div>
              </div>
              <div class="flex w-full justify-start items-center">
                <div
                  class="flex items-center justify-between lg:justify-end w-full"
                >
                  <Counter
                    class="ml-10"
                    :loader="item.disabled"
                    :value="item.quantity"
                    @increment="handleIncrement(item)"
                    @decrement="handleDecrement(item)"
                    @delete="handleDelete(item)"
                  />

                  <div class="lg:min-w-[10rem]">
                    {{ $filters.separate(item?.variant.price) }}

                    تومان
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between py-6 px-4">
              <div class="flex items-center flex-wrap">
                <span class="ml-3">
                  {{ store?.cart?.items_count }}
                  کالا در سبد خرید
                </span>
                <span class="ml-3 hidden lg:block"> حذف تمامی آیتم ها </span>
              </div>
              <div class="hidden lg:block">
                <span>قابل پرداخت : </span>
                <span>
                  {{ $filters.separate(cart?.payable_price) }}
                  تومان
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="relative col-span-12 lg:col-span-3">
          <check-out-summary page="cart">
            <template #continue>
              <base-button @click="handleShipping" block>ادامه</base-button>
            </template>
          </check-out-summary>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center" v-else>
      <nuxt-icon name="bag-cross" class="w-14 h-14"></nuxt-icon>

      <h4 class="mt-6 text-gray-600">سبد خرید شما خالی است!</h4>
      <p class="mt-4 text-sm text-gray-400">
        می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheckk
import CheckOutSummary from "@/modules/checkout/components/share/Summary.vue";
import { useCartStore } from "@/modules/checkout/store";
import { useUserStore } from "@/modules/user/store";
import { storeToRefs } from "pinia";
import Counter from "@/components/common/counter.vue";
import { useRouter } from "vue-router";

const store = useCartStore();
const userStore = useUserStore();
const loader = ref<any>(false);
const { cart } = storeToRefs(store);
const router = useRouter();
const handleIncrement = async (variant) => {
  variant.disabled = true;
  const data = {
    variant_id: variant.variant.id,
  };
  await store.add(data);

  variant.disabled = false;
};

const cartIsEmpty = computed(() => {
  if (store.cart?.cart_items?.length >= 1) return false;
  return true;
});

const handleDecrement = async (variant) => {
  variant.disabled = true;
  const data = {
    cart_item_id: variant.id,
    quantity: variant.quantity - 1,
  };
  await store.update(data);
  variant.disabled = false;
};

const handleDelete = async (variant) => {
  variant.disabled = true;
  await store.remove(variant.id);
  variant.disabled = false;
};

const handleShipping = (ev: MouseEvent) => {
  if (!userStore.loggedIn) {
    router.push({ name: "auth" });
  }
  router.push({ name: "checkout-shipping" });
};

onMounted(async () => {
  await store.get();
});
</script>

<style scoped></style>
