<template>
  <div id="userLoginPage">
    <h2 class="title">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="formState"
      name="basic"
      label-align="left"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="handleSubmit"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账户"
        name="userAccount"
        :rules="[{ required: true, message: '请输入账户！' }]"
      >
        <a-input
          v-model:value="formState.userAccount"
          placeHolder="请输入账户"
        />
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码！' },
          { min: 8, message: '密码不能低于 8 位！' },
        ]"
      >
        <a-input-password
          v-model:value="formState.userPassword"
          placeHolder="请输入密码"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { userLogin } from "@/api/user";
import { useLoginUserStore } from "@/store/useLoginUserStore";
import { message } from "ant-design-vue";
import router from "@/router";

interface FormState {
  userAccount: string;
  userPassword: string;
}

const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
});

const loginUserStore = useLoginUserStore();

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: never) => {
  const res = await userLogin(values);
  // 登录成功，把用户信息保存到全局状态中
  if (res.data.code === 0 && res.data.data) {
    await loginUserStore.fetchLoginUser();
    message.success("登陆成功");
    await router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败");
  }
};

const onFinishFailed = (errorInfo: never) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
#userLoginPage .title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
