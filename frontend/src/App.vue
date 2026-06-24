<template>
  <div>
    <header class="header">
      <div class="brand">
        🎓 校內獎學金資訊平台
      </div>

      <nav>
        <router-link to="/">獎學金查詢</router-link>
        <router-link to="/followed">我的追蹤</router-link>
      </nav>
    </header>

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: "Microsoft JhengHei", sans-serif;
  background: #fff;
}

.header {
  background: #760000;
  color: white;

  padding: 18px 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 26px;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 24px;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a.router-link-active {
  font-weight: bold;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 30px;
}
</style>