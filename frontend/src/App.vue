<template>
  <nav>
    <router-link to="/">首頁</router-link> |
    <router-link to="/followed">追蹤清單</router-link>
  </nav>

  <router-view />
</template>

<script setup>
// 不需要 HelloWorld 或其他東西（已移除範例模板）
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
}

/* 導覽列 */
.nav {
  display: flex;
  gap: 16px;
  padding: 12px 20px;
  background: #1e293b;
}

/* 連結樣式 */
.link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  color: #38bdf8;
}

/* 內容區 */
.container {
  padding: 20px;
}
</style>