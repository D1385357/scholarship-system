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

    <div class="hero">
      <h1>我的追蹤清單</h1>
      <p>已加入追蹤的獎學金</p>
    </div>

    <div v-if="list.length === 0">
      尚未追蹤任何獎學金
    </div>

    <div class="card-grid">

      <div
        class="card"
        v-for="s in list"
        :key="s.id"
      >
        <h3>{{ s.name }}</h3>

        <p>{{ s.description }}</p>

        <div class="info">
          <span>
            💰 {{ s.amount.toLocaleString() }} 元
          </span>

          <span>
            📅 {{ s.deadline }}
          </span>
        </div>

        <button
          class="follow-btn"
          @click="unfollow(s.id)"
        >
          取消追蹤
        </button>
      </div>

    </div>

  </div>
</template>

<style>
  .hero {
    background: #760000;
    color: white;

    padding: 60px;
    margin-bottom: 30px;
  }

  .card-grid {
    display: grid;

    grid-template-columns:
      repeat(auto-fill, minmax(320px, 1fr));

    gap: 20px;
  }

  .card {
    background: white;

    border: 1px solid #ddd;

    padding: 20px;

    box-shadow: 0 2px 10px rgba(0,0,0,.08);
  }

    .info {
    display: flex;
    justify-content: space-between;

    margin: 15px 0;
  }

  .follow-btn {
    width: 100%;

    background: #760000;
    color: white;

    border: none;

    padding: 10px;
  }

</style>