import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RecordingsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recordings, setRecordings] = useState([]);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    line: "",
    in_out: "",
    minDuration: "",
    maxDuration: "",
  });

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // Fetch recordings for selected date
    setTimeout(fetchRecordings, 0); // defer to let `date` update
  };
  

  const fetchRecordings = async () => {
    try {
      setLoading(true);

      let url = `${import.meta.env.VITE_API_BASE_URL}/api/recordings?deviceId=${id}`;
      if (date) {
        const formatted = date.toISOString().split("T")[0];
        url += `&date=${formatted}`;
      }
  
      const res = await axios.get(url);
      setRecordings(Array.isArray(res.data) ? res.data : res.data.data || []);

    } catch (err) {
      console.error("Error fetching recordings", err);
      setRecordings([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRecordings();
  }, []);

  const applyFilters = (data) => {
    if (!Array.isArray(data)) return [];

    return data.filter((rec) => {
      const matchLine = filters.line ? rec.line == filters.line : true;
      const matchInOut = filters.in_out ? rec.in_out === filters.in_out : true;
  
      // Convert mm:ss to seconds
      const toSeconds = (str) => {
        const [m, s] = str.split(":").map(Number);
        return m * 60 + s;
      };
  
      const recSeconds = rec.duration ? toSeconds(rec.duration) : 0;
      const minMatch = filters.minDuration ? recSeconds >= toSeconds(filters.minDuration) : true;
      const maxMatch = filters.maxDuration ? recSeconds <= toSeconds(filters.maxDuration) : true;
  
      return matchLine && matchInOut && minMatch && maxMatch;
    });
  };
  
  const filteredRecordings = applyFilters(recordings);
  

  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
          ← Back
        </button>
        <div className="flex items-center space-x-2">
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="border rounded px-2 py-1"
          isClearable
          placeholderText="Filter by date"
        />

          <button onClick={fetchRecordings} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            SYNC
          </button>
          <button onClick={() => window.location.reload()} className="px-2 py-1 bg-gray-500 text-white rounded">
            RELOAD
          </button>
          {/* Optional: FILTER button */}
          <button
            className="px-2 py-1 bg-yellow-500 text-white rounded"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            {showFilters ? "HIDE FILTERS" : "FILTER"}
          </button>
          {showFilters && (
            <div className="bg-gray-50 p-4 mt-2 rounded shadow text-sm space-y-3">
              <div className="flex gap-4">
                <div>
                  <label className="block text-gray-700">Line:</label>
                  <select
                    className="border rounded px-2 py-1"
                    value={filters.line}
                    onChange={(e) => setFilters({ ...filters, line: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="1">Line 1</option>
                    <option value="2">Line 2</option>
                    <option value="3">Line 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">In/Out:</label>
                  <select
                    className="border rounded px-2 py-1"
                    value={filters.in_out}
                    onChange={(e) => setFilters({ ...filters, in_out: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="IN">Incoming</option>
                    <option value="OUT">Outgoing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Min Duration (mm:ss):</label>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-24"
                    placeholder="e.g. 01:00"
                    value={filters.minDuration}
                    onChange={(e) => setFilters({ ...filters, minDuration: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Max Duration (mm:ss):</label>
                  <input
                    type="text"
                    className="border rounded px-2 py-1 w-24"
                    placeholder="e.g. 03:00"
                    value={filters.maxDuration}
                    onChange={(e) => setFilters({ ...filters, maxDuration: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow border">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Line</th>
              <th className="px-4 py-2 text-left">In/Out</th>
              <th className="px-4 py-2 text-left">Phone No</th>
              <th className="px-4 py-2 text-left">Channel</th>
              <th className="px-4 py-2 text-left">Duration</th>
              <th className="px-4 py-2 text-left">Date & Time</th>
              <th className="px-4 py-2 text-left">Comment</th>
              <th className="px-4 py-2 text-left">Play</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">Loading...</td>
              </tr>
            ) : recordings.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-red-600 font-semibold">
                  No Recordings for current date
                </td>
              </tr>
            ) : (
              filteredRecordings.map((rec, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{rec.line}</td>
                  <td className="px-4 py-2">{rec.in_out}</td>
                  <td className="px-4 py-2">{rec.phone_number}</td>
                  <td className="px-4 py-2">{rec.channel}</td>
                  <td className="px-4 py-2">{rec.duration}</td>
                  <td className="px-4 py-2">{new Date(rec.date_time).toLocaleString()}</td>
                  <td className="px-4 py-2">{rec.comment || "-"}</td>
                  <td className="px-4 py-2">
                    <audio controls className="w-32">
                      <source src={`${import.meta.env.VITE_API_BASE_URL}/recordings/${rec.file_name}`} type="audio/mpeg" />
                    </audio>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
