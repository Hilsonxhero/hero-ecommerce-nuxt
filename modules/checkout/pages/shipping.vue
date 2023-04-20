<template>
  <div class="container my-12">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-9">
        <Address
          v-model="selected_address"
          :default-address="shipping?.default_address"
        />

        <div
          class="bg-white shadow-lg lg:bg-transparent lg:shadow-transparent lg:border rounded-xl"
        >
          <div class="">
            <div class="border-b flex items-center justify-between p-5">
              <div>نحوه ارسال</div>
              <div class="text-gray-600">
                سفارش شما در {{ shipping.packages_count }} مرسوله ارسال خواهد شد
              </div>
            </div>

            <div class="p-5">
              <shipping-item
                v-for="(item, index) in shipping.packages"
                :key="index"
                :package="item"
                :package-key="index"
                :package-number="index + 1"
                @change="onChangeHandler"
              ></shipping-item>
            </div>
          </div>
        </div>
      </div>
      <div class="relative col-span-12 lg:col-span-3">
        <check-out-summary page="shipping">
          <template #continue>
            <base-button @click="handleShipping" block>ادامه</base-button>
          </template>
        </check-out-summary>
      </div>
    </div>
    <CreateAddress
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @create="fetchShipping"
      v-model="create_address_visible"
    >
      <template #cancel>
        <base-button class="mr-2" variant="light" @click="navigareToCart()">
          بازگشت به سبد خرید</base-button
        >
      </template>
    </CreateAddress>
  </div>
</template>

<script setup lang="ts">
import CreateAddress from "@/modules/user/components/profile/address/create.vue";
import ShippingItem from "@/modules/checkout/components/shipping/ShippingItem.vue";
import Address from "@/modules/checkout/components/shipping/Address.vue";
import CheckOutSummary from "@/modules/checkout/components/share/Summary.vue";
import { useCartStore } from "@/modules/checkout/store";
import { storeToRefs } from "pinia";

const store = useCartStore();

const { cart } = storeToRefs(store);

const router = useRouter();

const create_address_visible = ref(false);

const shipping = ref<any>({});

const selected_address = ref<any>({});

const packages = ref<Array<any>>([]);

const onChangeHandler = (val) => {
  let selected = packages.value.find(
    (item, index) => item.delivery_id == val.delivery_id
  );
  selected.time_scope = val.time_scope;
};

const navigareToCart = () => {
  create_address_visible.value = false;
  router.push({ name: "checkout cart" });
};

const handleShipping = () => {
  const formData = {
    address_id: selected_address.value,
    packages: packages.value,
  };
  ApiService.post(`shipping`, formData).then(({ data }) => {
    if (data.success) {
      router.push({ name: "checkout-payment" });
    }
  });
};

const handleShippingCost = () => {
  const formData = {
    address_id: shipping.value.default_address?.id,
    packages: packages.value,
  };
  useApiService.post(`shipping/cost`, formData).then((data) => {
    if (data.success) {
      store.replace({
        shipment_cost: data.data?.shipping_cost,
        payable_price: data.data?.payable_price,
      });
    }
  });
};

const fetchShipping = () => {
  useApiService.get(`shipping`).then((data) => {
    if (data.status == "410") {
      create_address_visible.value = true;
    } else {
      store.fetch(data.data.cart);

      shipping.value = data.data;
      shipping.value.packages.map((item, index) => {
        packages.value.push({
          delivery_id: item.delivery_id,
          shipment_id: item.submit_type?.id,
        });
      });
      handleShippingCost();
    }
  });
};

onMounted(() => {
  fetchShipping();
});
</script>

<style scoped></style>
