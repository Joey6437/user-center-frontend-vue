<template>
  <div id="userRegisterPage">
    <h2 class="title">用户注册</h2>
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

      <a-form-item
        label="确认密码"
        name="checkPassword"
        :rules="[
          { required: true, message: '请输入确认密码！' },
          { min: 8, message: '确认密码不能低于 8 位！' },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkPassword"
          placeHolder="请输入密码"
        />
      </a-form-item>

      <a-form-item
        label="编号"
        name="planetCode"
        :rules="[{ required: true, message: '请输入编号！' }]"
      >
        <a-input-password
          v-model:value="formState.planetCode"
          placeHolder="请输入编号"
        />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { userRegister } from "@/api/user";
import { message } from "ant-design-vue";
import router from "@/router";

interface FormState {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
  planetCode: string;
}

const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  planetCode: "",
});

/**
 * 提交表单
 * @param values
 */
const handleSubmit = async (values: never) => {
  // 校验两次输入的密码是否一致
  if (formState.userPassword != formState.checkPassword) {
    message.error("两次输入的密码不一致！");
    return;
  }

  const res = await userRegister(values);
  // 注册成功，跳转到登录页面
  if (res.data.code === 0 && res.data.data) {
    message.success("注册成功");
    await router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.data.message);
  }
};

const onFinishFailed = (errorInfo: never) => {
  console.log("Failed:", errorInfo);
};
</script>

<style scoped>
#userRegisterPage .title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
