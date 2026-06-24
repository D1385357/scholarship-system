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

    // 直接更新目前畫面資料
    const item = list.value.find((s) => s.id === id);

    if (item) {
      item.is_followed = value;
    }
  }

  const sortType = ref("");

const getRemainingDays = (deadline) => {
  const today = new Date();
  const end = new Date(deadline);

  const diff = Math.ceil(
    (end - today) / (1000 * 60 * 60 * 24)
  );

  return diff;
};

const getStatus = (deadline) => {
  const days = getRemainingDays(deadline);

  if (days < 0) return "已截止";
  if (days <= 7) return "即將截止";

  return "申請中";
};

const sortScholarships = () => {
  if (sortType.value === "amount") {
    list.value.sort((a, b) => b.amount - a.amount);
  }

  if (sortType.value === "deadline") {
    list.value.sort(
      (a, b) =>
        new Date(a.deadline) - new Date(b.deadline)
    );
  }
};

  onMounted(load);
</script>

<template>
  <div class="hero">
    <h1>校內獎學金資訊平台</h1>
    <p>快速查詢、追蹤感興趣的獎學金</p>
  </div>
  <div>
    <h2>🎓 獎學金查詢系統</h2>

    <input v-model="keyword" placeholder="搜尋獎學金" />
    <button @click="doSearch">搜尋</button>
    <button @click="load">重置</button>

    <hr />

    <div class="search-bar">
      <input
      v-model="keyword"
      placeholder="輸入獎學金名稱"
      />

      <button @click="doSearch">
        搜尋
      </button>
    </div>

    <div class="sort-bar">
      <label>排序：</label>

      <select
        v-model="sortType"
        @change="sortScholarships"
      >
        <option value="">預設</option>
        <option value="amount">
          金額高 → 低
        </option>

        <option value="deadline">
          截止日近 → 遠
        </option>
      </select>
    </div>

    <div class="card-grid">
      <div class="card" v-for="s in list" :key="s.id">

        <div class="card-header">

          <h3>{{ s.name }}</h3>

          <span
            class="status"
            :class="{
              urgent: getStatus(s.deadline) === '即將截止',
              closed: getStatus(s.deadline) === '已截止'
            }"
          >
            {{ getStatus(s.deadline) }}
          </span>

        </div>

        <p>{{ s.description }}</p>

        <div class="info">
          <span>
            💰 {{ s.amount.toLocaleString() }} 元
          </span>

          <span>
            📅 {{ s.deadline }}
          </span>
        </div>

        <div class="countdown">
          剩餘 {{ getRemainingDays(s.deadline) }} 天
        </div>

        <button
          class="follow-btn"
          @click="follow(s.id, s.is_followed ? 0 : 1)"
        >
          {{ s.is_followed ? "已追蹤" : "加入追蹤" }}
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

  .hero h1 {
    margin: 0;
    font-size: 40px;
  }

  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }

  .search-bar input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ccc;
  }

  .search-bar button {
    background: #760000;
    color: white;

    border: none;
    padding: 12px 24px;
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

  .card h3 {
    color: #760000;
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

  .sort-bar {
    margin-bottom: 20px;
  }

  .sort-bar select {
    padding: 8px;
  }

  .card-header {
    display: flex;

    justify-content: space-between;

    align-items: center;
  }

  .status {
    padding: 4px 10px;

    border-radius: 4px;

    font-size: 12px;

    background: #ddd;
  }

  .urgent {
    background: #d32f2f;

    color: white;
  }

  .closed {
    background: #333;

    color: white;
  }

  .countdown {
    color: #760000;

    font-weight: bold;

    margin-bottom: 10px;
  }
</style>
