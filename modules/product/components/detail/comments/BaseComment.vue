<template>
  <div>
    <div>
      <section class="comments-container">
        <div class="flex items-start w-full">
          <section
            class="z-10 hidden flex-col w-full bg-gray-100 space-y-3 lg:sticky lg:left-0 lg:top-24 lg:flex lg:flex-grow lg:items-center lg:justify-center lg:mx-0 lg:mx-auto lg:pr-4 lg:px-6 lg:py-4 lg:w-full lg:bg-transparent lg:rounded-xl lg:space-x-reverse lg:space-y-0 min-w-[18.75rem] max-w-[18.75rem] lg:border lg:border-gray-300"
          >
            <div
              v-if="comments.length >= 1"
              class="flex flex-col lg:flex-grow bg-gray-100 lg:bg-transparent rounded-xl p-3 lg:px-0 lg:py-0 mb-12 lg:mb-2 lg:w-full"
            >
              <section
                class="flex items-center flex-row lg:flex-col lg:border-b broder-gray-300 lg:mb-2 lg:pb-2 justify-center"
              >
                <div
                  class="font-black text-base order-1 mx-3 lg:mx-0 lg:order-none lg:text-[40px] lg:mb-4"
                >
                  {{ rating }}
                </div>
                <div class="min-h-8 lg:w-36 t-flex-center w-[7.5rem]"></div>
                <div class="min-w-12 lg:min-w-[max-content]">
                  <div class="mr-2 lg:mr-0 order-2 lg:order-none text-sm mt-1">
                    از مجموع {{ commentsCount }} رای
                  </div>
                </div>
              </section>
              <section
                class="space-y-5 mt-7 lg:flex lg:flex-grow lg:flex-col lg:justify-between lg:w-full lg:mt-0 lg:space-y-2 lg:border-b broder-gray-300 lg:mb-2 lg:pb-2"
              >
                <div
                  v-for="(score, i) in comment_scores"
                  class="grid grid-cols-9 lg:flex justify-between w-full lg:justify-start lg:flex-col items-center lg:items-start"
                >
                  <span
                    class="col-span-4 lg:col-span-3 text-xs lg:font-medium text-right"
                  >
                    {{ score.title }}
                  </span>
                  <div
                    class="col-span-5 lg:col-span-9 flex flex-grow lg:w-full items-center lg:justify-between"
                  >
                    <section class="flex-grow min-w-[90%]">
                      <div class="w-full ltr flex flex-grow lg:rtl">
                        <div class="w-full bg-gray-200 rounded-full">
                          <div
                            class="text-white rounded-inherit text-xs leading-none text-center transition py-2"
                            style="
                              background: rgb(102, 187, 106) none repeat scroll
                                0% 0%;
                            "
                            :style="{ width: score.average + '%' }"
                          ></div>
                        </div>
                      </div>
                    </section>
                    <div class="font-bold order-last text-center ml-1 mr-2">
                      {{ score.average }}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section class="lg:mx-auto lg:w-full">
              <div
                class="py-3 w-full text-center text-primary font-bold bg-gray-50 rounded-xl cursor-pointer lg:hidden"
              >
                نظر خود را ثبت کنید
              </div>
              <div class="flex items-center justify-start w-full">
                <div class="flex lg:flex-col lg:space-y-4 lg:items-center">
                  <span class="text-sm font-bold"
                    >شما هم نظرتان را بنویسید</span
                  >
                  <span class="text-center text-typo-light text-xs"
                    >با ارسال نظر ضمن کمک به دیگران، اگر کالا را از فالکون خریده
                    باشید امتیاز دریافت خواهید کرد</span
                  >

                  <base-button
                    @click="openNewCommentDialog"
                    variant="primary"
                    block
                    >ارسال نظر جدید</base-button
                  >
                </div>
              </div>
            </section>
          </section>
          <div class="block w-full overflow-hidden lg:flex-grow lg:pr-4">
            <section
              class="flex flex-col lg:flex-row justify-between mb-4 lg:items-center"
            >
              <div class="justify-between flex item-center mb-3 lg:mb-0">
                <span
                  class="flex lg:block p-detail-heading p-detail-heading-border whitespace-nowrap"
                  >نظرات کاربران</span
                >
              </div>
              <div class="flex items-center">
                <span
                  class="block px-2 py-2 text-xs whitespace-nowrap rounded-xl cursor-pointer lg:flex lg:items-center lg:px-4 lg:py-2 lg:h-[3rem] font-bold bg-gray-100 text-link transition-all duration-300 ease-out"
                >
                  جدیدترین نظرات </span
                ><span
                  class="block px-2 py-2 text-xs whitespace-nowrap rounded-xl cursor-pointer lg:flex lg:items-center lg:px-4 lg:py-2 lg:h-[3rem]"
                >
                  مفیدترین نظرات </span
                ><span
                  class="block px-2 py-2 text-xs whitespace-nowrap rounded-xl cursor-pointer lg:flex lg:items-center lg:px-4 lg:py-2 lg:h-[3rem]"
                >
                  خریداران کالا
                </span>
              </div>
            </section>
            <template v-if="comments.length >= 1">
              <div v-for="(comment, i) in comments">
                <div class="gap-4 grid grid-cols-1">
                  <div>
                    <div
                      class="flex flex-col items-start justify-between p-3 w-full bg-gray-100 rounded-xl lg:px-6 lg:py-4 lg:shadow-none"
                    >
                      <section class="flex flex-col w-full h-full">
                        <div
                          class="flex flex-col 2xs:flex-row 2xs:items-center items-start w-full text-2xs 2xs:text-xs font-medium 2xs:divide-x 2xs:divide-x-reverse 2xs:space-x-3 2xs:space-x-reverse sm:text-sm text-success"
                        >
                          <div class="t-center">
                            <template v-if="comment.is_recommendation">
                              <base-button icon variant="gray">
                                <nuxt-icon class="text-gray-500" name="like">
                                </nuxt-icon>
                              </base-button>

                              <span class="mr-2">توصیه می کنم</span>
                            </template>
                            <template v-else>
                              <base-button icon variant="gray">
                                <nuxt-icon class="text-gray-500" name="dislike">
                                </nuxt-icon>
                              </base-button>

                              <span class="mr-2">توصیه نمی کنم</span>
                            </template>
                          </div>
                          <!-- <div class="2xs:pr-3 t-center">

                          <span class="2xs:mr-2 text-primary">
                            خریدار محصول هستم
                          </span>
                        </div> -->
                        </div>
                        <h6
                          class="mb-2 mt-4 text-sm font-bold lg:mb-0 lg:mt-2 lg:text-base"
                        >
                          {{ comment.title }}
                        </h6>

                        <p class="text-xs lg:text-sm">
                          {{ comment.content }}
                        </p>

                        <div
                          class="flex flex-wrap justify-between mt-3 w-full flex-row-reverse lg:flex-row"
                        >
                          <div
                            class="flex flex-col items-start justify-center order-last lg:flex-row lg:items-center lg:justify-start lg:order-none lg:space-x-2 lg:space-x-reverse"
                          >
                            <div
                              class="order-last lg:order-none flex item-center"
                            >
                              <span class="text-typo-light text-xs">{{
                                comment.username
                              }}</span>
                              <span
                                class="mx-1 w-1.5 h-1.5 bg-typo-lighter rounded-full lg:mx-2"
                              ></span>
                              <span class="text-typo-light text-xs">{{
                                comment.created_at
                              }}</span>
                            </div>
                            <!-- <div class="flex item-center">
                            <span class="hidden w-1.5 h-1.5 bg-typo-lighter rounded-full lg:inline"></span>
                            <span class="ml-1 text-typo-light text-xs lg:mx-2">فروشنده</span>
                            <div class="flex item-center">
                              <span class="text-typo-light text-xs">
                                فالکون
                              </span>
                            </div>
                          </div> -->
                          </div>
                          <section
                            class="mr-1 mt-2 text-typo-light space-x-4 space-x-reverse transition-opacity lg:mt-0 lg:space-x-5 lg:space-x-reverse flex item-center"
                          >
                            <div
                              class="cursor-pointer space-x-3 space-x-reverse flex item-center"
                            >
                              <span class="self-center">{{
                                comment.like
                              }}</span>

                              <base-button icon variant="gray">
                                <nuxt-icon class="text-gray-500" name="like">
                                </nuxt-icon>
                              </base-button>
                            </div>
                            <div
                              class="cursor-pointer space-x-3 space-x-reverse flex item-center"
                            >
                              <span class="self-center">{{
                                comment.dislike
                              }}</span>

                              <base-button icon variant="gray">
                                <nuxt-icon class="text-gray-500" name="dislike">
                                </nuxt-icon>
                              </base-button>
                            </div>
                          </section>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                <div class="rounded-xl bg-white vue-portal-target">
                  <div
                    class="w-full overflow-x-auto t-pagination text-typo-light lg:block"
                    style=""
                    pagecount="1"
                    currentpage="1"
                  >
                    <section
                      class="flex justify-between py-3 text-gray-700"
                    ></section>
                  </div>
                </div>
                <div class="vue-portal-target"></div>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col justify-center items-center space-y-3">
                <div class="text-gray-700">
                  هنوز نظری روی این کالا ثبت نشده است.
                </div>
                <span class="text-xs text-gray-400 text-center">
                  شما میتوانید با نظر دادن به این کالا هم به کاربران دیگر کمک
                  کنید و هم امتیاز بگیرید
                </span>
              </div>
            </template>

            <div class="my-2">
              <!-- <hx-pagination
                v-model:current-page="pagination.page"
                @current-change="currentPageChange"
                :page-size="pagination.rowsPerPage"
                layout="prev, pager, next"
                :total="pagination.total"
                :hide-on-single-page="true"
                background
              >
              </hx-pagination> -->
            </div>
          </div>
        </div>
      </section>
    </div>

    <base-dialog title="ثبت نظر جدید" v-model="visiable_dialog">
      <div class="mx-4">
        <base-form
          ref="formRef"
          :model="form"
          labhx-width="100px"
          class="demo-ruleForm grid grid-cols-12 gap-2"
        >
          <div class="col-span-12">
            <div v-for="(score, index) in models" :key="index">
              <div>{{ score.title }}</div>
              <base-stepper
                :max="100"
                :show-tooltip="false"
                v-model="scores[index].value"
                :step="20"
              />
            </div>

            <div class="text-center text-gray-500 my-6 cursor-pointer">
              ثبت امتیاز تخصصی
            </div>
          </div>

          <base-form-item
            v-slot="{ field }"
            prop="advantage"
            label="ویژگی مثبت"
            class="col-span-12"
          >
            <base-input
              v-bind="field"
              v-model="form.advantage"
              placeholder="ویژگی مثبت"
            >
              <template #suffix>
                <nuxt-icon
                  @click="handleAddAdvantage"
                  class="w-6 h-6 text-gray-500"
                  name="add"
                ></nuxt-icon>
              </template>
            </base-input>

            <div class="flex flex-wrap items-center">
              <base-badge
                class="ml-1 mt-1 mb-1"
                type="success"
                v-for="(advantage, i) in form.advantages"
                :key="i"
              >
                <div class="flex items-center justify-between">
                  <span class="ml-1">{{ advantage }}</span>
                  <nuxt-icon
                    @click="handleDeleteAdvantage(i)"
                    class="w-3 h-3 text-white"
                    name="close-square"
                  ></nuxt-icon>
                </div>
              </base-badge>
            </div>
          </base-form-item>

          <base-form-item
            v-slot="{ field }"
            prop="disadvantage"
            label="ویژگی منفی"
            class="col-span-12"
          >
            <base-input
              v-bind="field"
              v-model="form.disadvantage"
              placeholder="ویژگی منفی"
            >
              <template #suffix>
                <nuxt-icon
                  @click="handleAddDisadvantage"
                  class="w-6 h-6 text-gray-500"
                  name="add"
                ></nuxt-icon>
              </template>
            </base-input>

            <div class="flex flex-wrap items-center">
              <base-badge
                class="ml-1 mt-1 mb-1"
                type="danger"
                v-for="(disadvantage, i) in form.disadvantages"
                :key="i"
              >
                <div class="flex items-center justify-between">
                  <span class="ml-1">{{ disadvantage }}</span>
                  <nuxt-icon
                    @click="handleDeleteDisadvantage(i)"
                    class="w-3 h-3 text-white"
                    name="close-square"
                  ></nuxt-icon>
                </div>
              </base-badge>
            </div>
          </base-form-item>

          <base-form-item
            v-slot="{ field }"
            prop="title"
            :rules="[
              {
                required: true,
                message: ' عنوان نظر الزامی می باشد',
              },
            ]"
            label="عنوان"
            class="col-span-12"
          >
            <base-input
              v-bind="field"
              v-model="form.title"
              placeholder="عنوان نظر"
            ></base-input>
          </base-form-item>

          <base-form-item
            v-slot="{ field }"
            label="متن نظر"
            prop="content"
            :rules="[
              {
                required: true,
                message: ' متن نظر الزامی می باشد',
              },
            ]"
            class="col-span-12"
          >
            <base-input
              show-word-limit
              maxlength="100"
              class="h-20"
              v-bind="field"
              type="textarea"
              v-model="form.content"
              placeholder="متن نظر"
            ></base-input>
          </base-form-item>
        </base-form>
      </div>
      <template #footer>
        <div>
          <base-button :loading="loader" @click="create()">ثبت نظر</base-button>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
// @ts-nocheckk
import { onMounted, ref, watch, computed } from "vue";
// import { HxStepper } from "@/components/base/stepper";
import { useRoute } from "vue-router";
import BaseMessage from "@/components/base/message";
import { BaseFormItem, BaseForm } from "@/components/base/form";
interface IPagination {
  page: number;
  total: number;
  rowsPerPage: number;
}

const props = defineProps({
  // comments: {},
  rating: {},
  count: {},
});

const route = useRoute();

const formRef = ref(null);
const product_id = ref(null);
const visiable_dialog = ref(false);
const loader = ref(false);
const scores = ref([]);
const form = ref({
  title: null,
  content: null,
  scores: [],
  is_anonymous: true,
  is_recommendation: true,
  advantages: [],
  disadvantages: [],
  advantage: null,
  disadvantage: null,
});

const pager = ref({});
const comments = ref([]);
const comment_scores = ref([]);
const models = ref([]);
const pagination = ref<IPagination>({
  page: 1,
  total: 0,
  rowsPerPage: 15,
});

const currentPageChange = (val: any) => {
  pagination.value.page = val;
  // emit("page", val);
};

watch(
  () => comments.value,
  (val) => {
    // comment_scores.map((score, index) => {
    //   const key = score.id;
    //   scores.value[index] = { id: score.id, value: 50 }
    // })
  }
);

watch(
  () => pagination.value.page,
  (currentValue, oldValue) => {
    fetchComments();
  }
);

const fetchComments = () => {
  // loading.value = true;
  useApiService
    .get(`comments/product/${product_id.value}`, {
      params: { page: pagination.value.page },
    })
    .then((data) => {
      comments.value = data.comments;
      comment_scores.value = data.scores;
      models.value = data.models;
      pager.value = data.pager;
      // pagination.value.page = pager.value.current_page
      pagination.value.total = pager.value.total;
      pagination.value.rowsPerPage = pager.value.per_page;
      models.value.map((score, index) => {
        const key = score.id;
        scores.value[index] = { id: score.id, value: 50 };
      });
      // loading.value = false;
    })
    .catch(() => {});
};

const create = async () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loader.value = true;

        const formData = {
          title: form.value.title,
          content: form.value.content,
          advantages: form.value.advantages,
          disadvantages: form.value.disadvantages,
          is_anonymous: form.value.is_anonymous,
          is_recommendation: form.value.is_recommendation,
          scores: scores.value,
        };

        const data = await useApiService.post(
          `comments/product/${product_id.value}`,
          formData
        );

        if (data.success) {
          form.value.title = "";
          form.value.content = "";
          form.value.advantage = null;
          form.value.disadvantage = null;
          form.value.advantages = [];
          form.value.disadvantages = [];
          models.value.map((score, index) => {
            const key = score.id;
            scores.value[index] = { id: score.id, value: 50 };
          });

          formRef.value.resetFields();

          BaseMessage({
            message: "نظر شما ثبت گردید و پس از بررسی نمایش داده می شود",
            type: "success",
            duration: 4000,
            center: true,
            offset: 100,
            "custom-class": "",
          });
        }
        visiable_dialog.value = false;
        loader.value = false;
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  });
};

const openNewCommentDialog = () => {
  visiable_dialog.value = true;
};

const handleAddAdvantage = () => {
  if (
    form.value.advantages.findIndex(
      (advantage, i) => advantage == form.value.advantage
    ) !== -1
  )
    return false;
  form.value.advantages.push(form.value.advantage);
  form.value.advantage = "";
};

const handleAddDisadvantage = () => {
  if (
    form.value.disadvantages.findIndex(
      (disadvantage, i) => disadvantage == form.value.disadvantage
    ) !== -1
  )
    return false;
  form.value.disadvantages.push(form.value.disadvantage);
  form.value.disadvantage = "";
};

const handleDeleteAdvantage = (index) => {
  form.value.advantages.splice(index, 1);
};

const handleDeleteDisadvantage = (index) => {
  form.value.disadvantages.splice(index, 1);
};

const commentsCount = computed(() => {
  return props.count ?? 0;
});

onMounted(() => {
  product_id.value = route.params.id;

  fetchComments();
});
</script>

<style scoped></style>
