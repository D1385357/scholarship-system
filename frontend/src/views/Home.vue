<script setup>
import { ref, onMounted } from "vue";
import { getAll, search, toggleFollow } from "../api/scholarshipApi";

const list = ref([]);
const keyword = ref("");

const load = async () => {
  const res = await getAll();
  list.value = res.data;
};

const doSearch = async () => {
  const res = await search(keyword.value);
  list.value = res.data;
};

const follow = async (id, value) => {
  await toggleFollow(id, value);
  load();
};

onMounted(load);
</script>

<template>
  <div>
    <h2>🎓 獎學金查詢系統</h2>

    <input v-model="keyword" placeholder="搜尋獎學金" />
    <button @click="doSearch">搜尋</button>
    <button @click="load">重置</button>

    <hr />

    <div v-for="s in list" :key="s.id">
      <h3>{{ s.name }}</h3>
      <p>金額：{{ s.amount }}</p>
      <p>截止：{{ s.deadline }}</p>

      <button @click="follow(s.id, s.is_followed ? 0 : 1)">
        {{ s.is_followed ? "⭐ 已追蹤" : "追蹤" }}
      </button>
    </div>
  </div>
</template>