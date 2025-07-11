const pool = require("../config/db");

exports.getRecordings = async (req, res) => {
  const { deviceId, date } = req.query;

  try {
    const [rows] = await pool.execute(
      "SELECT * FROM recordings WHERE device_id = ? AND DATE(date_time) = ?",
      [deviceId, date]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recordings" });
  }
};
