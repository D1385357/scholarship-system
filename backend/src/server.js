const express = require("express");
const cors = require("cors");
const db = require("./db/database");

const app = express();

app.use(cors());
app.use(express.json());

// 1️⃣ 先建立資料表（最重要）
db.run(`
CREATE TABLE IF NOT EXISTS scholarships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  amount INTEGER,
  deadline TEXT,
  is_followed INTEGER DEFAULT 0
)
`, (err) => {
  if (err) {
    console.error("Create table error:", err);
  } else {
    console.log("Table ready");

    // 2️⃣ 再做 seed
    db.get("SELECT COUNT(*) AS count FROM scholarships", (err, row) => {
      if (err) {
        console.error("DB error:", err);
        return;
      }

      const count = row?.count ?? 0;

      if (count === 0) {
        const stmt = db.prepare(`
          INSERT INTO scholarships (name, description, amount, deadline)
          VALUES (?, ?, ?, ?)
        `);

        stmt.run("清寒獎學金", "提供清寒學生補助", 20000, "2026-09-01");
        stmt.run("科技人才獎學金", "資訊工程人才", 50000, "2026-08-15");
        stmt.run("優秀學生獎學金", "學業優秀", 30000, "2026-07-30");
        stmt.run("體育獎學金", "體育表現優秀", 15000, "2026-10-01");

        stmt.finalize();

        console.log("Seed data inserted");
      }
    });
  }
});

// API routes
const scholarshipRoutes = require("./routes/scholarships");
app.use("/scholarships", scholarshipRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});