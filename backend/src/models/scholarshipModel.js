const db = require("../db/database");

const Scholarship = {
  getAll(callback) {
    db.all("SELECT * FROM scholarships", callback);
  },

  search(keyword, callback) {
    db.all(
      "SELECT * FROM scholarships WHERE name LIKE ?",
      [`%${keyword}%`],
      callback
    );
  },

  updateFollow(id, value, callback) {
    db.run(
      "UPDATE scholarships SET is_followed=? WHERE id=?",
      [value, id],
      callback
    );
  },
};

module.exports = Scholarship;
module.exports = Scholarship;