<script setup>
import { ref, onMounted } from "vue";
import { getAll, toggleFollow } from "../api/scholarshipApi";

const list = ref([]);

const load = async () => {
  const res = await getAll();
  list.value = res.data.filter((s) => s.is_followed === 1);
};

const unfollow = async (id) => {
  await toggleFollow(id, 0);
  load();
};

onMounted(load);
</script>

<template>
  <div>
    <h2>⭐ 已追蹤獎學金</h2>

    <div v-if="list.length === 0">
      沒有追蹤任何獎學金
    </div>

    <div v-for="s in list" :key="s.id">
      <h3>{{ s.name }}</h3>
      <p>金額：{{ s.amount }}</p>
      <p>截止：{{ s.deadline }}</p>

      <button @click="unfollow(s.id)">
        取消追蹤
      </button>
    </div>
  </div>
</template>