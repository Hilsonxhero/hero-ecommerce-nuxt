<template>
  <div class="mt-16">
    <section
      class="flex flex-col space-y-3 lg:items-center lg:space-y-0 lg:flex-row lg:space-x-reverse"
    ></section>
    <div eager="">
      <section class="comments-container">
        <div class="flex w-full items-start">
          <section
            class="hidden border border-gray-300 rounded-xl p-4 lg:flex lg:flex-col sticky min-w-[18.75rem] max-w-[18.75rem] lg:top-24 lg:left-0 z-10"
          >
            <div class="w-full mt-1 lg:mt-0">
              <div class="h-full">
                <base-form :model="form" ref="formRef" class="h-full">
                  <div class="space-y-3 lg:space-y-3">
                    <base-form-group label="پرسش خود را مطرح کنید">
                      <base-form-item
                        v-slot="{ field }"
                        prop="content"
                        :rules="[
                          {
                            required: true,
                            message: ' متن پرسش الزامی می باشد',
                          },
                        ]"
                        label="عنوان"
                        class="col-span-12"
                      >
                        <base-input
                          class="h-28"
                          type="textarea"
                          v-bind="field"
                          v-model="form.content"
                          placeholder="بنویسید .."
                        ></base-input>
                      </base-form-item>
                    </base-form-group>
                    <div class="flex flex-col space-y-3 lg:space-y-4">
                      <base-button @click="create()" bock>ثبت پرسش</base-button>
                    </div>
                  </div>
                </base-form>
              </div>
            </div>
            <div class="lg:w-[2rem] lg:min-w-[2rem]"></div>
          </section>
          <div class="flex flex-col flex-grow" style="">
            <section
              class="flex flex-col lg:flex-row w-full lg:items-center mb-4 lg:mr-4"
            >
              <div class="t-row justify-between mb-3 lg:mb-0">
                <span class="block p-detail-heading p-detail-heading-border"
                  >پرسش های کاربران</span
                >
                <i
                  color="#666"
                  name="t-icon-sort-24px"
                  class="block text-4xl text-typo-light ml-4 mr-4 lg:mr-32 material-icons t-icon-sort-24px"
                ></i>
              </div>
              <div class="flex lg:items-center">
                <span
                  class="block cursor-pointer px-2 py-2 lg:py-2 lg:px-4 rounded-xl lg:flex lg:items-center lg:h-[3rem] text-sm"
                >
                  جدیدترین ها </span
                ><span
                  class="block cursor-pointer px-2 py-2 lg:py-2 lg:px-4 rounded-xl lg:flex lg:items-center lg:h-[3rem] text-sm font-bold bg-gray-100 text-link transition-all duration-300 ease-out"
                >
                  کاربردی ترین ها
                </span>
              </div>
            </section>
            <div>
              <div class="lg:mr-4 flex-grow gap-4 grid grid-cols-1">
                <template v-if="questions.length >= 1">
                  <div
                    class="flex w-full"
                    v-for="(question, i) in questions"
                    :key="i"
                  >
                    <div
                      class="rounded-xl lg:rounded-xl bg-gray-100 lg:px-4 overflow-x-hidden lg:overflow-x-visible w-full"
                    >
                      <div class="lg:flex lg:justify-evenly lg:w-full">
                        <div class="flex items-center justify-center">
                          <base-button icon variant="gray">
                            <nuxt-icon
                              class="text-gray-500"
                              name="message-question"
                            ></nuxt-icon>
                          </base-button>
                        </div>
                        <section
                          class="group flex items-end justify-between p-3 lg:px-6 lg:py-4 lg:flex-grow w-full lg:w-auto"
                        >
                          <section
                            class="space-y-2 w-full border-b pb-2 border-gray-300"
                          >
                            <div class="flex justify-between lg:justify-start">
                              <span class="text-xs font-medium lg:ml-4">{{
                                question.username
                              }}</span>
                              <div class="text-typo-light text-xs lg:text-sm">
                                {{ question.created_at }}
                              </div>
                            </div>
                            <div class="flex justify-between items-end">
                              <p class="text-sm lg:font-medium">
                                {{ question.content }}
                              </p>
                              <section
                                class="hidden lg:flex lg:items-center lg:justify-end text-typo-light group-hover:text-link lg:w-max lg:whitespace-nowrap"
                              >
                                <i
                                  color="#666"
                                  name="t-icon-reply_black_24dp"
                                  class="text-3xl ml-4 transition-all opacity-0 group-hover:opacity-100 material-icons t-icon-reply_black_24dp"
                                ></i>
                                <span
                                  class="text-xs font-medium cursor-pointer"
                                  @click="handleOpenAnswerDialog(question)"
                                  >پاسخ به این پرسش</span
                                >
                              </section>
                            </div>
                          </section>
                        </section>
                        <div></div>
                      </div>

                      <div
                        class="flex mb-3"
                        v-for="(reply, i) in question.replies"
                        :key="i"
                      >
                        <div
                          class="hidden lg:flex items-center justify-center lg:min-w-[5.56rem] lg:w-[5.56rem] text-sm text-typo-light"
                        >
                          پاسخ
                        </div>
                        <div
                          class="flex w-full px-3 py-3 lg:p-6 rounded-xl h-full lg:flex-col justify-between bg-gray-200 border-b lg:border-none mx-4 lg:mx-0 lg:flex-grow border-none"
                        >
                          <i
                            color="#666"
                            name="t-icon-reply_black_24dp"
                            class="text-3xl ml-4 text-typo-lighter lg:hidden material-icons t-icon-reply_black_24dp"
                          ></i>
                          <section
                            class="space-y-3 lg:space-y-5 w-full h-full flex-col justify-between"
                          >
                            <div class="t-row justify-between lg:justify-start">
                              <span class="text-sm lg:font-medium lg:ml-4">
                                کاربر فالکون</span
                              >
                              <span
                                class="text-typo-light text-xs lg:text-sm"
                                >{{ reply.created_at }}</span
                              >
                            </div>
                            <div
                              class="flex flex-col items-end space-y-3 lg:space-y-0 lg:flex-row lg:justify-between"
                            >
                              <p class="block w-full text-sm lg:font-medium">
                                {{ reply.content }}
                              </p>
                              <section
                                class="flex items-center transition-opacity text-typo-light space-x-reverse lg:space-x-reverse space-x-4 lg:space-x-5 mr-1"
                              >
                                <div
                                  class="flex items-center cursor-pointer space-x-reverse space-x-3"
                                >
                                  <span>{{ reply.like }}</span>

                                  <base-button icon variant="gray">
                                    <nuxt-icon
                                      class="text-gray-500"
                                      name="like"
                                    >
                                    </nuxt-icon>
                                  </base-button>
                                </div>
                                <div
                                  class="flex items-center cursor-pointer space-x-reverse space-x-3"
                                >
                                  <span>{{ reply.dislike }}</span>
                                  <base-button icon variant="gray">
                                    <nuxt-icon
                                      class="text-gray-500"
                                      name="dislike"
                                    >
                                    </nuxt-icon>
                                  </base-button>
                                </div>
                              </section>
                            </div>
                          </section>
                        </div>
                      </div>
                      <div class="t-flex-center py-4 lg:hidden text-link">
                        <i
                          color="#666"
                          name="t-icon-reply_black_24dp"
                          class="text-xl ml-4 material-icons t-icon-reply_black_24dp"
                        ></i>
                        <div>پاسخ شما</div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div
                    class="flex flex-col justify-center items-center space-y-3"
                  >
                    <div class="text-gray-700">
                      هنوز پرسش روی این کالا ثبت نشده است .
                    </div>
                    <span class="text-xs text-gray-400 text-center">
                      شما هم میتوانید درباره ی این کالا پرسش ثبت کنید
                    </span>
                  </div>
                </template>
                <div>
                  <div class="my-2">
                    <base-pagination
                      v-model:current-page="pagination.page"
                      @current-change="currentPageChange"
                      :page-size="pagination.rowsPerPage"
                      layout="prev, pager, next"
                      :total="pagination.total"
                      :hide-on-single-page="true"
                      background
                    >
                    </base-pagination>
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
          </div>
        </div>
      </section>
    </div>

    <base-dialog
      title="پاسخ به پرسش"
      width="50%"
      v-model="visiable_answer_dialog"
    >
      <div class="mx-4">
        <base-form
          ref="answerFormRef"
          :model="answer_form"
          labhx-width="100px"
          class="demo-ruleForm grid grid-cols-12 gap-2"
        >
          <div class="w-full flex col-span-12">
            <div class="flex items-center justify-center">
              <base-button icon variant="gray">
                <nuxt-icon
                  class="text-gray-500"
                  name="message-question"
                ></nuxt-icon>
              </base-button>
            </div>
            <section
              class="group flex items-end justify-between p-3 lg:px-6 lg:py-4 lg:flex-grow w-full lg:w-auto"
            >
              <section class="space-y-2 w-full border-b pb-2 border-gray-300">
                <div class="flex justify-between lg:justify-start">
                  <span class="text-xs font-medium lg:ml-4">{{
                    relpy_question.username
                  }}</span>
                </div>
                <div class="flex justify-between items-end">
                  <p class="text-sm lg:font-medium">
                    {{ relpy_question.content }}
                  </p>
                </div>
              </section>
            </section>
            <div></div>
          </div>

          <base-form-item
            v-slot="{ field }"
            label="متن پاسخ"
            prop="content"
            :rules="[
              {
                required: true,
                message: ' متن پاسخ الزامی می باشد',
              },
            ]"
            class="col-span-12"
          >
            <base-input
              show-word-limit
              maxlength="500"
              class="h-32"
              v-bind="field"
              type="textarea"
              v-model="answer_form.content"
              placeholder="متن پاسخ"
            ></base-input>
          </base-form-item>
        </base-form>
      </div>
      <template #footer>
        <div>
          <base-button :loading="loader" @click="submitAnswer()"
            >ثبت پاسخ</base-button
          >
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheckk

import { BaseForm, BaseFormItem, BaseFormGroup } from "@/components/base/form";

import BaseMessage from "@/components/base/message";

interface IPagination {
  page: number;
  total: number;
  rowsPerPage: number;
}

const props = defineProps({
  // comments: {},
  // rating: {},
  count: {},
});

const route = useRoute();
const formRef = ref(null);
const answerFormRef = ref(null);

const product_id = ref(null);
const loader = ref(false);

const form = ref({
  content: null,
  is_anonymous: true,
});

const answer_form = ref({
  content: null,
  is_anonymous: true,
});

const relpy_question = ref({});

const visiable_answer_dialog = ref(false);

const pager = ref({});
const questions = ref([]);

const pagination = ref<IPagination>({
  page: 1,
  total: 0,
  rowsPerPage: 15,
});

const currentPageChange = (val: any) => {
  pagination.value.page = val;
};

const handleOpenAnswerDialog = (question: any) => {
  visiable_answer_dialog.value = true;
  relpy_question.value = question;
};

watch(
  () => questions.value,
  (val) => {}
);

watch(
  () => pagination.value.page,
  (currentValue, oldValue) => {
    fetchQuestions();
  }
);

const fetchQuestions = () => {
  // loading.value = true;
  useApiService
    .get(`questions/product/${product_id.value}`, {
      params: { page: pagination.value.page },
    })
    .then((data) => {
      questions.value = data.questions;
      pager.value = data.pager;
      // pagination.value.page = pager.value.current_page
      pagination.value.total = pager.value.total;
      pagination.value.rowsPerPage = pager.value.per_page;
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
          content: form.value.content,
          is_anonymous: form.value.is_anonymous,
        };

        const data = await useApiService.post(
          `questions/product/${product_id.value}`,
          formData
        );

        if (data.success) {
          form.value.content = "";

          formRef.value.resetFields();

          BaseMessage({
            message: "پرسش شما ثبت گردید و پس از بررسی نمایش داده می شود",
            type: "success",
            duration: 4000,
            center: true,
            offset: 100,
            "custom-class": "",
          });
        }
        loader.value = false;
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  });
};

const submitAnswer = async () => {
  if (!answerFormRef.value) return;
  answerFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        loader.value = true;

        const formData = {
          content: answer_form.value.content,
          is_anonymous: answer_form.value.is_anonymous,
          product_question_id: relpy_question.value.id,
        };

        const data = await useApiService.post(
          `questions/product/${product_id.value}`,
          formData
        );

        if (data.success) {
          visiable_answer_dialog.value = false;

          answer_form.value.content = "";

          answerFormRef.value.resetFields();

          BaseMessage({
            message: "پاسخ شما ثبت گردید و پس از بررسی نمایش داده می شود",
            type: "success",
            duration: 4000,
            center: true,
            offset: 100,
            "custom-class": "",
          });
        }
        loader.value = false;
      } catch (error) {
        console.error(error);
      }
    } else {
      return false;
    }
  });
};

const questionsCount = computed(() => {
  // return props.count ?? 0
  return 0;
});

onMounted(() => {
  product_id.value = route.params.id;
  fetchQuestions();
});
</script>

<style scoped></style>
