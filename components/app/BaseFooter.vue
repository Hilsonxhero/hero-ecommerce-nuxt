<template>
  <footer>
    <div class="container">
      <div
        class="bg-gray-100 overflow-hidden rounded-xl mb-4 w-full px-6 flex content-between items-center"
      >
        <div class="flex-grow hidden lg:block">
          <div class="flex text-sm py-5">
            <div class="text-gray-700 ml-3">پشتیبانی</div>
            <div class="">
              <a class="text-gray-600 text-sm" href="tel:034-91002425">
                {{ configuration.phone }}
              </a>
              <span class="pr-4 text-sm font-bold text-gray-600">
                {{ configuration.support_text }}</span
              >
            </div>
          </div>
          <div class="flex text-sm mt-2">
            <div class="text-gray-700 ml-3">ایمیل</div>
            <a class="text-gray-600 text-sm" href="mailto:info@gmail.com">
              {{ configuration.email }}
            </a>
          </div>
        </div>

        <div
          class="grid grid-cols-2 grid-rows-2 items-center lg:flex lg:pb-4 lg:pt-6 lg:space-x-2 lg:space-x-reverse"
        >
          <div class="flex items-center justify-center flex-col">
            <a
              href="/page/send-method"
              rel=""
              class="items-center w-36 h-[7.75rem] t-col flex flex-col justify-center lg:w-[9.25rem] lg:h-[9.25rem]"
              ><span class="w-14 h-14 lg:w-16 lg:h-16 block"
                ><img
                  src="@/assets/icons/fastSend.svg"
                  loading="lazy"
                  alt="ارسال سریع"
                  class="w-full h-full transition-opacity duration-500"
                  width="64"
                  height="64"
                />
              </span>
              <div
                class="mt-4 text-center text-gray-800 text-xs font-bold leading-6 lg:mt-5 lg:text-sm"
              >
                ارسال سریع کالا
              </div>
            </a>
          </div>
          <div class="flex items-center justify-center flex-col">
            <a
              href="/page/refunds"
              rel=""
              class="items-center w-36 h-[7.75rem] t-col flex flex-col justify-center lg:w-[9.25rem] lg:h-[9.25rem]"
              ><span class="w-14 h-14 lg:w-16 lg:h-16 block"
                ><img
                  src="@/assets/icons/productReturn.svg"
                  loading="lazy"
                  alt="گارانتی طلایی ما"
                  class="w-full h-full transition-opacity duration-500"
                  width="64"
                  height="64"
                />
              </span>
              <div
                class="mt-4 text-center text-gray-800 text-xs font-bold leading-6 lg:mt-5 lg:text-sm"
              >
                مهلت ۷ روز بازگشت کالا
              </div>
            </a>
          </div>
          <div class="flex items-center justify-center flex-col">
            <a
              href="/contact-us"
              rel="noopener noreferrer nofollow"
              class="items-center w-36 h-[7.75rem] t-col flex flex-col justify-center lg:w-[9.25rem] lg:h-[9.25rem]"
              ><span class="w-14 h-14 lg:w-16 lg:h-16 block"
                ><img
                  src="@/assets/icons/phoneSupport.svg"
                  loading="lazy"
                  alt="پشتیبانی تلفنی"
                  class="w-full h-full transition-opacity duration-500"
                  width="64"
                  height="64"
                />
              </span>
              <div
                class="mt-4 text-center text-gray-800 text-xs font-bold leading-6 lg:mt-5 lg:text-sm"
              >
                پشتیبانی تلفنی
              </div>
            </a>
          </div>
          <div class="flex items-center justify-center flex-col">
            <a
              href="/page/guarantee"
              rel="noopener noreferrer nofollow"
              class="items-center w-36 h-[7.75rem] t-col flex flex-col justify-center lg:w-[9.25rem] lg:h-[9.25rem]"
              ><span class="w-14 h-14 lg:w-16 lg:h-16 block"
                ><img
                  src="@/assets/icons/productGuaranty.svg"
                  loading="lazy"
                  alt="تضمین اصالت کالا"
                  class="w-full h-full transition-opacity duration-500"
                  width="64"
                  height="64"
                />
              </span>
              <div
                class="mt-4 text-center text-gray-800 text-xs font-bold leading-6 lg:mt-5 lg:text-sm"
              >
                تضمین اصالت کالا
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useCommonStore } from "@/modules/common/store";
import { storeToRefs } from "pinia";
const store = useCommonStore();
const { configuration } = storeToRefs(store);
</script>

<style scoped></style>
