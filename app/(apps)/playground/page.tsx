"use client";

import { useState } from "react";
import {
  Play,
  Trash2,
  ChevronRight,
  ChevronDown,
  Table2,
  Hash,
  Type,
  Calendar,
  CheckCircle2,
  Loader2,
  Settings,
} from "lucide-react";

// Theme types
type Theme = "aqua" | "platinum";

// Mock schema data
const schemaData = [
  {
    name: "users",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "varchar" },
      { name: "email", type: "varchar" },
      { name: "created_at", type: "timestamp" },
    ],
  },
  {
    name: "products",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "varchar" },
      { name: "price", type: "decimal" },
      { name: "category_id", type: "integer" },
      { name: "created_at", type: "timestamp" },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "id", type: "integer" },
      { name: "user_id", type: "integer" },
      { name: "product_id", type: "integer" },
      { name: "quantity", type: "integer" },
      { name: "total", type: "decimal" },
      { name: "ordered_at", type: "timestamp" },
    ],
  },
  {
    name: "categories",
    columns: [
      { name: "id", type: "integer" },
      { name: "name", type: "varchar" },
      { name: "slug", type: "varchar" },
    ],
  },
];

// Mock results data
const mockResults = [
  { id: 8, name: "Sarah Chen", email: "sarah.chen@example.com", created_at: "2024-03-15" },
  { id: 7, name: "Marcus Johnson", email: "marcus.j@company.io", created_at: "2024-03-12" },
  { id: 6, name: "Emma Williams", email: "emma.w@startup.co", created_at: "2024-02-28" },
  { id: 5, name: "James Miller", email: "james.miller@dev.org", created_at: "2024-02-14" },
  { id: 4, name: "Aisha Patel", email: "aisha.p@tech.com", created_at: "2024-01-22" },
];

const defaultQuery = `SELECT id, name, email, created_at
FROM users
WHERE created_at > '2024-01-01'
ORDER BY created_at DESC
LIMIT 5;`;

const getTypeIcon = (type: string, theme: Theme) => {
  const size = theme === "platinum" ? "w-3.5 h-3.5" : "w-4 h-4";
  switch (type) {
    case "integer":
    case "decimal":
      return <Hash className={size} />;
    case "varchar":
      return <Type className={size} />;
    case "timestamp":
      return <Calendar className={size} />;
    default:
      return <Type className={size} />;
  }
};

export default function PlaygroundPage() {
  const [theme, setTheme] = useState<Theme>("platinum");
  const [activeTab, setActiveTab] = useState<"results" | "messages">("results");
  const [expandedTables, setExpandedTables] = useState<string[]>(["users"]);
  const [selectedDb, setSelectedDb] = useState("ecommerce");
  const [isExecuting, setIsExecuting] = useState(false);
  const [query, setQuery] = useState(defaultQuery);
  const [showSettings, setShowSettings] = useState(false);

  const toggleTable = (tableName: string) => {
    setExpandedTables((prev) =>
      prev.includes(tableName)
        ? prev.filter((t) => t !== tableName)
        : [...prev, tableName]
    );
  };

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setActiveTab("results");
    }, 800);
  };

  const handleClear = () => {
    setQuery("");
  };

  const settingsDropdown = (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className={`flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-lg shadow-lg transition-all ${
          theme === "platinum"
            ? "bg-[#dddddd] border-2 border-t-white border-l-white border-b-black border-r-black text-black hover:bg-[#cccccc]"
            : "bg-white/90 backdrop-blur border border-gray-300 text-gray-700 hover:bg-white"
        }`}
        style={{ fontFamily: theme === "platinum" ? '"Geneva", system-ui' : '-apple-system, system-ui' }}
      >
        <Settings className="w-4 h-4" />
        Settings
      </button>

      {showSettings && (
        <div
          className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden ${
            theme === "platinum"
              ? "bg-[#dddddd] border-2 border-black"
              : "bg-white/95 backdrop-blur border border-gray-200"
          }`}
        >
          <div className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wide ${
            theme === "platinum" ? "bg-[#cccccc] border-b border-[#888]" : "bg-gray-100 border-b text-gray-500"
          }`}>
            Theme
          </div>
          <div className="p-1">
            <button
              onClick={() => { setTheme("platinum"); setShowSettings(false); }}
              className={`w-full text-left px-3 py-2 text-[13px] rounded ${
                theme === "platinum"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
              style={{ fontFamily: '"Geneva", system-ui' }}
            >
              System 7 (Platinum)
            </button>
            <button
              onClick={() => { setTheme("aqua"); setShowSettings(false); }}
              className={`w-full text-left px-3 py-2 text-[13px] rounded ${
                theme === "aqua"
                  ? "bg-[#3399ff] text-white"
                  : "hover:bg-gray-100"
              }`}
              style={{ fontFamily: '-apple-system, system-ui' }}
            >
              Mac OS X (Aqua)
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (theme === "platinum") {
    return (
      <>
        {settingsDropdown}
        <PlatinumTheme
          query={query}
          setQuery={setQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          expandedTables={expandedTables}
          toggleTable={toggleTable}
          selectedDb={selectedDb}
          setSelectedDb={setSelectedDb}
          isExecuting={isExecuting}
          handleRun={handleRun}
          handleClear={handleClear}
          theme={theme}
        />
      </>
    );
  }

  return (
    <>
      {settingsDropdown}
      <AquaTheme
        query={query}
        setQuery={setQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        expandedTables={expandedTables}
        toggleTable={toggleTable}
        selectedDb={selectedDb}
        setSelectedDb={setSelectedDb}
        isExecuting={isExecuting}
        handleRun={handleRun}
        handleClear={handleClear}
        theme={theme}
      />
    </>
  );
}

// Props interface for themes
interface ThemeProps {
  query: string;
  setQuery: (q: string) => void;
  activeTab: "results" | "messages";
  setActiveTab: (tab: "results" | "messages") => void;
  expandedTables: string[];
  toggleTable: (name: string) => void;
  selectedDb: string;
  setSelectedDb: (db: string) => void;
  isExecuting: boolean;
  handleRun: () => void;
  handleClear: () => void;
  theme: Theme;
}

// ============================================
// PLATINUM THEME (Classic Mac OS System 7)
// ============================================
function PlatinumTheme({
  query, setQuery, activeTab, setActiveTab, expandedTables, toggleTable,
  selectedDb, setSelectedDb, isExecuting, handleRun, handleClear, theme
}: ThemeProps) {
  return (
    <div className="h-screen flex flex-col" style={{ fontFamily: '"Chicago", "Geneva", system-ui, sans-serif' }}>
      <style jsx global>{`
        /* Platinum Theme - Classic Mac OS System 7 */

        /* Desktop pattern */
        .platinum-desktop {
          background-color: #666699;
          background-image: url("data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='2' height='2' fill='%23555588'/%3E%3Crect x='2' y='2' width='2' height='2' fill='%23555588'/%3E%3C/svg%3E");
        }

        /* Window */
        .platinum-window {
          background: #dddddd;
          border: 2px solid #000;
          box-shadow: 2px 2px 0 #000;
        }

        /* Title bar with stripes */
        .platinum-titlebar {
          background: linear-gradient(
            0deg,
            #dddddd 0px, #dddddd 1px,
            #ffffff 1px, #ffffff 2px,
            #dddddd 2px, #dddddd 3px,
            #ffffff 3px, #ffffff 4px,
            #dddddd 4px, #dddddd 5px,
            #ffffff 5px, #ffffff 6px
          );
          background-size: 100% 6px;
          border-bottom: 2px solid #000;
          height: 20px;
          display: flex;
          align-items: center;
          padding: 0 4px;
        }

        /* Close box */
        .platinum-close {
          width: 13px;
          height: 11px;
          background: #dddddd;
          border: 1px solid #000;
          margin-right: 8px;
          cursor: pointer;
        }

        .platinum-close:active {
          background: #000;
        }

        /* 3D Beveled Button */
        .platinum-btn {
          background: #dddddd;
          border: 2px solid;
          border-color: #ffffff #000000 #000000 #ffffff;
          padding: 6px 20px;
          font-size: 14px;
          font-family: "Chicago", "Geneva", system-ui, sans-serif;
          cursor: pointer;
          min-width: 90px;
        }

        .platinum-btn:active {
          border-color: #000000 #ffffff #ffffff #000000;
          background: #cccccc;
        }

        .platinum-btn-default {
          border: 3px solid #000;
          border-radius: 4px;
          padding: 3px 15px;
        }

        .platinum-btn-default::before {
          content: none;
        }

        /* Scrollbar */
        .platinum-scroll::-webkit-scrollbar {
          width: 16px;
          background: #dddddd;
        }

        .platinum-scroll::-webkit-scrollbar-thumb {
          background: #dddddd;
          border: 2px solid;
          border-color: #ffffff #000000 #000000 #ffffff;
        }

        .platinum-scroll::-webkit-scrollbar-button {
          height: 16px;
          background: #dddddd;
          border: 2px solid;
          border-color: #ffffff #000000 #000000 #ffffff;
        }

        .platinum-scroll::-webkit-scrollbar-track {
          background: repeating-linear-gradient(
            0deg,
            #dddddd 0px, #dddddd 1px,
            #888888 1px, #888888 2px
          );
        }

        /* Inset field */
        .platinum-inset {
          border: 2px solid;
          border-color: #888888 #ffffff #ffffff #888888;
          background: #ffffff;
        }

        /* Selection */
        .platinum-selected {
          background: #000 !important;
          color: #fff !important;
        }

        /* Divider line */
        .platinum-divider {
          border-top: 1px solid #888888;
          border-bottom: 1px solid #ffffff;
        }

        /* Tab styling */
        .platinum-tab {
          background: transparent;
          border: none;
          padding: 6px 20px;
          font-size: 14px;
          position: relative;
          cursor: pointer;
          margin-bottom: -1px;
        }

        .platinum-tab-active {
          background: #dddddd;
          color: #000;
          border: 1px solid #000;
          border-bottom: 1px solid #dddddd;
          font-weight: bold;
        }
      `}</style>

      {/* Desktop */}
      <div className="absolute inset-0 platinum-desktop" />

      {/* Window */}
      <div className="relative flex-1 flex items-center justify-center p-8">
        <div className="platinum-window w-full max-w-5xl h-[85vh] flex flex-col">

          {/* Title Bar */}
          <div className="platinum-titlebar">
            <div className="platinum-close" />
            <div className="flex-1 flex justify-center">
              <span className="text-[14px] font-bold bg-[#dddddd] px-2">SQL Playground</span>
            </div>
            <div className="w-[21px]" />
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#dddddd] border-b-2 border-[#888]">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-medium">Database:</span>
              <select
                value={selectedDb}
                onChange={(e) => setSelectedDb(e.target.value)}
                className="platinum-inset text-[14px] px-3 py-1.5"
              >
                <option value="ecommerce">Sample: E-commerce</option>
                <option value="hr">Sample: HR Database</option>
                <option value="blog">Sample: Blog</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={handleClear} className="platinum-btn flex items-center gap-1">
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
              <button onClick={handleRun} disabled={isExecuting} className="platinum-btn platinum-btn-default flex items-center gap-1">
                {isExecuting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                {isExecuting ? "Running..." : "Run Query"}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden bg-[#dddddd]">

            {/* Schema Explorer */}
            <aside className="w-56 border-r-2 border-[#888] bg-[#dddddd] flex flex-col">
              <div className="px-3 py-2 border-b border-[#888] bg-[#cccccc]">
                <span className="text-[13px] font-bold">Tables</span>
              </div>
              <div className="flex-1 overflow-y-auto platinum-scroll p-1">
                {schemaData.map((table) => (
                  <div key={table.name}>
                    <button
                      onClick={() => toggleTable(table.name)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-[14px] hover:bg-[#000] hover:text-[#fff]"
                    >
                      {expandedTables.includes(table.name) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                      <Table2 className="w-4 h-4" />
                      <span className="flex-1 text-left">{table.name}</span>
                    </button>

                    {expandedTables.includes(table.name) && (
                      <div className="ml-5 border-l border-[#888]">
                        {table.columns.map((col) => (
                          <div
                            key={col.name}
                            className="flex items-center gap-2 px-2 py-1 text-[13px] hover:bg-[#000] hover:text-[#fff] cursor-default"
                          >
                            {getTypeIcon(col.type, "platinum")}
                            <span className="flex-1">{col.name}</span>
                            <span className="text-[12px] text-[#666]">{col.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* Editor and Results */}
            <main className="flex-1 flex flex-col min-w-0">

              {/* SQL Editor */}
              <div className="flex-1 min-h-[150px] border-b-2 border-[#888] bg-[#dddddd] p-2">
                <div className="h-full platinum-inset flex">
                  <div
                    className="py-2 px-2 text-right text-[14px] text-[#666] select-none bg-[#eeeeee] border-r border-[#888]"
                    style={{ fontFamily: 'Monaco, "Courier New", monospace' }}
                  >
                    {query.split("\n").map((_, i) => (
                      <div key={i} className="leading-[20px]">{i + 1}</div>
                    ))}
                  </div>
                  <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    spellCheck={false}
                    className="flex-1 h-full py-2 px-2 bg-white text-[14px] leading-[20px] resize-none focus:outline-none text-[#000]"
                    style={{ fontFamily: 'Monaco, "Courier New", monospace' }}
                  />
                </div>
              </div>

              {/* Results Panel */}
              <div className="flex-1 min-h-[150px] flex flex-col bg-[#dddddd]">

                {/* Tabs */}
                <div className="flex items-center px-2 pt-2 bg-[#cccccc] border-b border-[#888]">
                  <button
                    onClick={() => setActiveTab("results")}
                    className={`platinum-tab ${activeTab === "results" ? "platinum-tab-active" : ""}`}
                  >
                    Results
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`platinum-tab ${activeTab === "messages" ? "platinum-tab-active" : ""}`}
                  >
                    Messages
                  </button>
                  <div className="flex-1" />
                  <span className="text-[13px] text-[#000]">5 rows • 0.023s</span>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-auto platinum-scroll bg-[#ffffff] m-2 platinum-inset">
                  {activeTab === "results" ? (
                    <table className="w-full text-[14px] border-collapse">
                      <thead>
                        <tr className="bg-[#dddddd]">
                          <th className="px-4 py-2 text-left font-bold border-r border-b border-[#888]">id</th>
                          <th className="px-4 py-2 text-left font-bold border-r border-b border-[#888]">name</th>
                          <th className="px-4 py-2 text-left font-bold border-r border-b border-[#888]">email</th>
                          <th className="px-4 py-2 text-left font-bold border-b border-[#888]">created_at</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockResults.map((row, index) => (
                          <tr key={row.id} className={`${index % 2 === 1 ? "bg-[#eeeeee]" : "bg-white"} hover:bg-[#000] hover:text-[#fff]`}>
                            <td className="px-4 py-1.5 border-r border-[#ddd]" style={{ fontFamily: 'Monaco, monospace' }}>{row.id}</td>
                            <td className="px-4 py-1.5 border-r border-[#ddd]">{row.name}</td>
                            <td className="px-4 py-1.5 border-r border-[#ddd]">{row.email}</td>
                            <td className="px-4 py-1.5">{row.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-[14px] font-bold">Query executed successfully</span>
                      </div>
                      <p className="mt-2 text-[14px]">5 rows returned in 0.023 seconds</p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#dddddd] border-t-2 border-[#888] text-[13px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00aa00]" />
              <span>Connected to sample_db</span>
            </div>
            <span>PostgreSQL 16</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// AQUA THEME (Mac OS X 2001)
// ============================================
function AquaTheme({
  query, setQuery, activeTab, setActiveTab, expandedTables, toggleTable,
  selectedDb, setSelectedDb, isExecuting, handleRun, handleClear, theme
}: ThemeProps) {
  return (
    <div className="h-screen flex flex-col">
      <style jsx global>{`
        /* Aqua Theme - Mac OS X 2001 */

        .aqua-pinstripe {
          background: repeating-linear-gradient(#E8E8E8, #E8E8E8 2px, #F8F8F8 2px, #F8F8F8 4px);
        }

        .aqua-btn-primary {
          font-family: -apple-system, "Lucida Grande", system-ui, sans-serif;
          font-size: 14px;
          font-weight: 600;
          height: 32px;
          padding: 0 24px;
          min-width: 100px;
          border-radius: 1000px;
          border: none;
          position: relative;
          overflow: hidden;
          cursor: default;
          outline: none;
          background: linear-gradient(rgba(0, 65, 184, 0.7), rgba(45, 115, 199, 0.7), rgba(33, 160, 196, 0.7));
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.35), 0 2px 2px rgba(0, 78, 187, 0.5), inset 0 2px 4px rgba(0, 17, 49, 0.8), inset 0 4px 6px 3px rgba(0, 78, 187, 0.75);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .aqua-btn-primary::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 35%;
          background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.3));
          width: calc(100% - 10px);
          border-radius: 20px 20px 6px 6px;
          top: 4%;
          filter: blur(1px);
          z-index: 2;
          pointer-events: none;
        }

        .aqua-btn-primary::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 35%;
          background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5));
          width: calc(100% - 12px);
          border-radius: 8px;
          bottom: 8%;
          filter: blur(3px);
          pointer-events: none;
        }

        .aqua-btn-primary span { position: relative; z-index: 1; text-shadow: 0 2px 3px rgba(0, 40, 100, 0.6); }

        .aqua-btn-secondary {
          font-family: -apple-system, "Lucida Grande", system-ui, sans-serif;
          font-size: 14px;
          font-weight: 600;
          height: 32px;
          padding: 0 20px;
          min-width: 80px;
          border-radius: 1000px;
          border: none;
          position: relative;
          overflow: hidden;
          cursor: default;
          outline: none;
          background: linear-gradient(rgba(140, 140, 140, 0.7), rgba(240, 240, 240, 0.7));
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25), 0 2px 2px rgba(0, 0, 0, 0.3), inset 0 2px 3px rgba(0, 0, 0, 0.45), inset 0 4px 6px 3px #AAAAAA;
          color: #111;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .aqua-btn-secondary::before {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 35%;
          background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.3));
          width: calc(100% - 10px);
          border-radius: 20px 20px 6px 6px;
          top: 4%;
          filter: blur(1px);
          z-index: 2;
          pointer-events: none;
        }

        .aqua-btn-secondary::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 35%;
          background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.5));
          width: calc(100% - 12px);
          border-radius: 8px;
          bottom: 8%;
          filter: blur(3px);
          pointer-events: none;
        }

        .aqua-btn-secondary span { position: relative; z-index: 1; text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6); }

        .brushed-metal {
          background: linear-gradient(180deg, #d8d8d8 0%, #c0c0c0 25%, #b0b0b0 50%, #c0c0c0 75%, #d0d0d0 100%);
          border-bottom: 1px solid #777;
        }

        .aqua-window {
          background: #c8c8c8;
          border: 1px solid #555;
          border-radius: 10px 10px 0 0;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3) inset, 0 10px 40px rgba(0, 0, 0, 0.45), 0 3px 10px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        .traffic-light {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.3);
          box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.5), 0 1px 3px rgba(0, 0, 0, 0.25);
          position: relative;
        }

        .traffic-light::after {
          content: '';
          position: absolute;
          top: 2px; left: 2px; right: 2px;
          height: 45%;
          background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.15));
          border-radius: 50% 50% 30% 30%;
        }

        .traffic-close { background: linear-gradient(180deg, #ff6b5b 0%, #d63d2d 100%); border-color: #a52a1a; }
        .traffic-minimize { background: linear-gradient(180deg, #ffca2c 0%, #dea210 100%); border-color: #9a7008; }
        .traffic-maximize { background: linear-gradient(180deg, #2dd23b 0%, #1aaa28 100%); border-color: #107018; }

        .aqua-scroll::-webkit-scrollbar { width: 16px; background: linear-gradient(90deg, #ddd 0%, #f0f0f0 50%, #ddd 100%); border-left: 1px solid #aaa; }
        .aqua-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, rgba(0, 90, 180, 0.5) 0%, rgba(40, 140, 210, 0.6) 30%, rgba(80, 170, 235, 0.7) 50%, rgba(40, 140, 210, 0.6) 70%, rgba(0, 90, 180, 0.5) 100%);
          border-radius: 10px;
          border: 1px solid rgba(0, 70, 150, 0.5);
          box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.5);
          margin: 2px;
        }
        .aqua-scroll::-webkit-scrollbar-button { display: none; }

        .aqua-select {
          appearance: none;
          font-family: -apple-system, "Lucida Grande", system-ui, sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #000;
          background: linear-gradient(#fff, #ddd);
          border: 1px solid #666;
          border-radius: 5px;
          padding: 6px 28px 6px 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9);
          cursor: default;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23333' d='M0 3l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }

        .aqua-row:hover { background: linear-gradient(180deg, #b8d4f8 0%, #94c0f4 100%) !important; }

        .aqua-tab {
          font-family: -apple-system, "Lucida Grande", system-ui, sans-serif;
          font-size: 14px;
          font-weight: 500;
          background: linear-gradient(#ccc, #aaa);
          border: 1px solid #777;
          border-bottom: none;
          border-radius: 6px 6px 0 0;
          padding: 8px 20px;
          color: #222;
          margin-right: -1px;
          position: relative;
          cursor: default;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
        }

        .aqua-tab-active {
          background: linear-gradient(#fff, #f0f0f0);
          border-bottom: 1px solid #f0f0f0;
          z-index: 1;
          color: #000;
          font-weight: 600;
        }

        .aqua-inset {
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.08);
          border: 1px solid #888;
        }
      `}</style>

      <div className="absolute inset-0 aqua-pinstripe" />

      <div className="relative flex-1 flex items-center justify-center p-6">
        <div className="aqua-window w-full max-w-6xl h-[90vh] flex flex-col">
          <header className="brushed-metal flex items-center px-4 py-2">
            <div className="flex items-center gap-2">
              <button className="traffic-light traffic-close" />
              <button className="traffic-light traffic-minimize" />
              <button className="traffic-light traffic-maximize" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-[16px] font-semibold text-[#111]" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>
                SQL Playground
              </h1>
            </div>
            <div className="w-[62px]" />
          </header>

          <div className="brushed-metal flex items-center justify-between px-4 py-3 border-t border-white/40">
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-medium text-[#222]" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>Database:</span>
              <select value={selectedDb} onChange={(e) => setSelectedDb(e.target.value)} className="aqua-select">
                <option value="ecommerce">Sample: E-commerce</option>
                <option value="hr">Sample: HR Database</option>
                <option value="blog">Sample: Blog</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleClear} className="aqua-btn-secondary">
                <Trash2 className="w-4 h-4 relative z-10" />
                <span>Clear</span>
              </button>
              <button onClick={handleRun} disabled={isExecuting} className="aqua-btn-primary">
                {isExecuting ? <Loader2 className="w-4 h-4 animate-spin relative z-10" /> : <Play className="w-4 h-4 relative z-10" />}
                <span>{isExecuting ? "Running..." : "Run Query"}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden bg-[#ddd]">
            <aside className="w-60 border-r border-[#888] bg-gradient-to-b from-[#f0f0f0] to-[#ddd] flex flex-col">
              <div className="px-4 py-2 border-b border-[#aaa] bg-gradient-to-b from-[#d0d0d0] to-[#bbb]">
                <span className="text-[13px] font-bold text-[#222] uppercase tracking-wide" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>Tables</span>
              </div>
              <div className="flex-1 overflow-y-auto aqua-scroll p-2">
                {schemaData.map((table) => (
                  <div key={table.name} className="mb-1">
                    <button onClick={() => toggleTable(table.name)} className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-[#b8d4f8] transition-colors text-[14px]" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>
                      {expandedTables.includes(table.name) ? <ChevronDown className="w-4 h-4 text-[#333]" /> : <ChevronRight className="w-4 h-4 text-[#333]" />}
                      <Table2 className="w-4 h-4 text-[#0055cc]" />
                      <span className="flex-1 text-left text-[#000] font-medium">{table.name}</span>
                      <span className="text-[12px] text-[#444] bg-[#c8c8c8] px-2 py-0.5 rounded font-medium">{table.columns.length}</span>
                    </button>
                    {expandedTables.includes(table.name) && (
                      <div className="ml-5 mt-1 border-l-2 border-[#aaa] pl-3">
                        {table.columns.map((col) => (
                          <div key={col.name} className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-[#b8d4f8] text-[13px] text-[#222] cursor-default" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>
                            <span className="text-[#0055cc]">{getTypeIcon(col.type, "aqua")}</span>
                            <span className="flex-1 font-medium">{col.name}</span>
                            <span className="text-[12px] text-[#555] italic">{col.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 min-h-[180px] border-b border-[#888] bg-white">
                <div className="h-full flex">
                  <div className="py-3 px-3 text-right text-[14px] text-[#666] select-none bg-[#e8e8e8] border-r border-[#bbb]" style={{ fontFamily: 'Monaco, "Courier New", monospace' }}>
                    {query.split("\n").map((_, i) => (<div key={i} className="leading-[22px]">{i + 1}</div>))}
                  </div>
                  <div className="flex-1 relative">
                    <textarea value={query} onChange={(e) => setQuery(e.target.value)} spellCheck={false} className="absolute inset-0 w-full h-full py-3 px-3 bg-transparent text-[14px] leading-[22px] resize-none focus:outline-none text-[#000]" style={{ fontFamily: 'Monaco, "Courier New", monospace' }} />
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[180px] flex flex-col aqua-pinstripe">
                <div className="flex items-end px-3 pt-2 border-b border-[#888] bg-gradient-to-b from-[#c8c8c8] to-[#b0b0b0]">
                  <button onClick={() => setActiveTab("results")} className={`aqua-tab ${activeTab === "results" ? "aqua-tab-active" : ""}`}>Results</button>
                  <button onClick={() => setActiveTab("messages")} className={`aqua-tab ${activeTab === "messages" ? "aqua-tab-active" : ""}`}>Messages</button>
                  <div className="flex-1" />
                  <span className="text-[13px] font-medium text-[#333] mb-2 mr-2" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>5 rows • 0.023s</span>
                </div>
                <div className="flex-1 overflow-auto aqua-scroll bg-white m-2 aqua-inset rounded">
                  {activeTab === "results" ? (
                    <table className="w-full text-[14px] border-collapse" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>
                      <thead>
                        <tr className="bg-gradient-to-b from-[#e0e0e0] to-[#ccc]">
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]">id</th>
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]">name</th>
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-r border-[#bbb] border-b-2 border-b-[#888]">email</th>
                          <th className="px-4 py-2.5 text-left text-[13px] font-bold text-[#000] uppercase border-b-2 border-b-[#888]">created_at</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockResults.map((row, index) => (
                          <tr key={row.id} className={`aqua-row border-b border-[#ddd] ${index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}`}>
                            <td className="px-4 py-2 text-[#007700] font-semibold border-r border-[#e8e8e8]" style={{ fontFamily: 'Monaco, "Courier New", monospace' }}>{row.id}</td>
                            <td className="px-4 py-2 text-[#000] border-r border-[#e8e8e8]">{row.name}</td>
                            <td className="px-4 py-2 text-[#333] border-r border-[#e8e8e8]">{row.email}</td>
                            <td className="px-4 py-2 text-[#333]">{row.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>
                      <div className="flex items-center gap-2 text-[#007700]">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-[15px] font-semibold">Query executed successfully</span>
                      </div>
                      <p className="mt-2 text-[14px] text-[#333]">5 rows returned in 0.023 seconds</p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          <footer className="flex items-center justify-between px-4 py-2 bg-gradient-to-b from-[#ccc] to-[#aaa] border-t border-[#888] text-[13px] text-[#222] font-medium" style={{ fontFamily: '-apple-system, "Lucida Grande", system-ui' }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2dd23b] border border-[#148a1e]" />
              <span>Connected to sample_db</span>
            </div>
            <span className="px-2 py-1 rounded bg-[#bbb] border border-[#888] text-[12px] font-semibold">PostgreSQL 16</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
