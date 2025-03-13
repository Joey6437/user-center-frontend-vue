<template>
  <div id="userManagePage">
    <a-input-search
      style="max-width: 480px; margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="输入用户名搜索"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image :src="record.avatarUrl" :width="60" />
        </template>
        <template v-else-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 1">
            <a-tag color="geekblue">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="volcano">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="record.dataIndex === 'createTime'">
          {{ dayjs(record.catateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <span>
            <a-button danger @click="onDelete(record.id)">删除</a-button>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { deleteUser, searchUsers } from "@/api/user";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

const searchValue = ref("");
const onSearch = () => {
  fetchData(searchValue.value);
};

const onDelete = async (id: string) => {
  if (!id) return;
  const res = await deleteUser(id);
  if (res.data.code === 0) {
    await fetchData();
    message.success("删除成功");
  } else {
    message.error("删除失败");
  }
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "账号",
    dataIndex: "userAccount",
  },
  {
    title: "头像",
    dataIndex: "avatarUrl",
  },
  {
    title: "性别",
    dataIndex: "gender",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "用户角色",
    dataIndex: "userRole",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
];

// 获取数据
const data = ref([]);

const fetchData = async (username = "") => {
  const res = await searchUsers(username);
  if (res.data.data) {
    data.value = res.data.data;
  } else {
    message.error("获取数据失败");
  }
};

fetchData();

// const data = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
</script>
