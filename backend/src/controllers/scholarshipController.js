const Scholarship = require("../models/scholarshipModel");

exports.getAll = (req, res) => {
  Scholarship.getAll((err, rows) => {
    res.json(rows);
  });
};

exports.search = (req, res) => {
  const keyword = req.query.keyword || "";

  Scholarship.search(keyword, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.follow = (req, res) => {
  const { id } = req.params;
  const { is_followed } = req.body;

  Scholarship.updateFollow(id, is_followed, function () {
    res.json({ updated: this.changes });
  });
};