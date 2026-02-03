import { useState, useMemo } from "react";
import { Search, Copy, Check, ChevronDown, Cpu, HardDrive, Sparkles, Zap, Shield, Eye, FileText, Code, Brain, AlertTriangle, MemoryStick, Sun, Moon, Info } from "lucide-react";

const SYSTEM_RAM = 70;

const models = [
  {
    id: "qwen3-coder-30b",
    name: "qwen/qwen3-coder-30b",
    parameters: "30B-A3B",
    paramSort: 30,
    size: 18.63,
    tags: ["coding", "programming", "openclaw"],
    recommendedFor: "Daily coding, code generation",
    isDefault: false,
    equivalentTo: "Claude 3.5 Sonnet (coding)",
  },
  {
    id: "qwq-32b",
    name: "qwen/qwq-32b",
    parameters: "32B",
    paramSort: 32,
    size: 19.85,
    tags: ["reasoning", "analysis", "tcp-decrypt", "openclaw"],
    recommendedFor: "TCP decrypt, complex reasoning",
    isDefault: false,
    equivalentTo: "OpenAI o1-mini (reasoning)",
  },
  {
    id: "gpt-oss-120b",
    name: "gpt-oss-120b",
    parameters: "120B",
    paramSort: 120,
    size: 62.56,
    tags: ["reasoning", "creative", "agentic"],
    recommendedFor: "Agentic workflows, creative writing",
    isDefault: false,
    equivalentTo: "GPT-4 Turbo (creative)",
  },
  {
    id: "llama-4-scout",
    name: "llama-4-scout-17b-16e-instruct",
    parameters: "17B (16 Experts)",
    paramSort: 17,
    size: 48.49,
    tags: ["multimodal", "vision", "documents", "long-context", "openclaw"],
    recommendedFor: "Document analysis, vision tasks",
    isDefault: false,
    equivalentTo: "GPT-4o (vision/multimodal)",
  },
  {
    id: "hermes-4-70b",
    name: "nousresearch/hermes-4-70b",
    parameters: "70B",
    paramSort: 70,
    size: 42.52,
    tags: ["reasoning", "security-audit", "general"],
    recommendedFor: "Security audits, vulnerability analysis",
    isDefault: false,
    equivalentTo: "Claude 3 Opus (analysis)",
  },
  {
    id: "qwen3-v1-32b",
    name: "qwen3-v1-32b-instruct",
    parameters: "32B",
    paramSort: 32,
    size: 20.96,
    tags: ["general", "writing", "translation"],
    recommendedFor: "General assistant, translation",
    isDefault: false,
    equivalentTo: "GPT-4o-mini (general)",
  },
  {
    id: "ministral-3-3b",
    name: "mistralai/ministral-3-3b",
    parameters: "3B",
    paramSort: 3,
    size: 2.99,
    tags: ["fast", "lightweight", "edge"],
    recommendedFor: "Quick lookups, edge deployment",
    isDefault: false,
    equivalentTo: "GPT-3.5 Turbo (fast)",
  },
  {
    id: "deepseek-coder-v2",
    name: "deepseek-coder-v2-lite-16b",
    parameters: "16B",
    paramSort: 16,
    size: 10.36,
    tags: ["coding", "lightweight"],
    recommendedFor: "Lightweight coding tasks",
    isDefault: false,
    equivalentTo: "Codex (code completion)",
  },
  {
    id: "gpt-oss-20b",
    name: "openai/gpt-oss-20b",
    parameters: "20B",
    paramSort: 20,
    size: 12.11,
    tags: ["general", "balanced"],
    recommendedFor: "Balanced general tasks",
    isDefault: false,
    equivalentTo: "GPT-4o-mini (balanced)",
  },
  {
    id: "glm-4.7-flash",
    name: "zai-org/glm-4.7-flash",
    parameters: "30B",
    paramSort: 30,
    size: 18.13,
    tags: ["fast", "general", "default", "openclaw"],
    recommendedFor: "Default model, fast responses",
    isDefault: true,
    equivalentTo: "GPT-4o (daily tasks)",
  },
];

const categories = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "openclaw", label: "OpenClaw", icon: Zap },
  { id: "coding", label: "Coding", icon: Code },
  { id: "security-audit", label: "Security", icon: Shield },
  { id: "reasoning", label: "Reasoning", icon: Brain },
  { id: "fast", label: "Fast", icon: Sparkles },
  { id: "general", label: "General", icon: Cpu },
  { id: "long-context", label: "Long-Context", icon: FileText },
  { id: "vision", label: "Vision", icon: Eye },
];

const sortOptions = [
  { id: "size-asc", label: "Size (Smallest)" },
  { id: "size-desc", label: "Size (Largest)" },
  { id: "params-asc", label: "Parameters (Smallest)" },
  { id: "params-desc", label: "Parameters (Largest)" },
  { id: "name-asc", label: "Name (A-Z)" },
  { id: "name-desc", label: "Name (Z-A)" },
];

const tagColors = {
  coding: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  programming: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  reasoning: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  analysis: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "tcp-decrypt": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  creative: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  agentic: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  multimodal: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  vision: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  documents: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "long-context": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "security-audit": "bg-red-500/20 text-red-400 border-red-500/30",
  general: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  writing: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  translation: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  fast: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  lightweight: "bg-lime-500/20 text-lime-400 border-lime-500/30",
  edge: "bg-stone-500/20 text-stone-400 border-stone-500/30",
  balanced: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  default: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  openclaw: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30",
};

 const tagColorsLight = {
   coding: "bg-emerald-100 text-emerald-900 border-emerald-300",
   programming: "bg-emerald-100 text-emerald-900 border-emerald-300",
   reasoning: "bg-purple-100 text-purple-900 border-purple-300",
   analysis: "bg-purple-100 text-purple-900 border-purple-300",
   "tcp-decrypt": "bg-orange-100 text-orange-900 border-orange-300",
   creative: "bg-pink-100 text-pink-900 border-pink-300",
   agentic: "bg-cyan-100 text-cyan-900 border-cyan-300",
   multimodal: "bg-indigo-100 text-indigo-900 border-indigo-300",
   vision: "bg-blue-100 text-blue-900 border-blue-300",
   documents: "bg-amber-100 text-amber-900 border-amber-300",
   "long-context": "bg-rose-100 text-rose-900 border-rose-300",
   "security-audit": "bg-red-100 text-red-900 border-red-300",
   general: "bg-slate-100 text-slate-900 border-slate-300",
   writing: "bg-violet-100 text-violet-900 border-violet-300",
   translation: "bg-teal-100 text-teal-900 border-teal-300",
   fast: "bg-yellow-100 text-yellow-900 border-yellow-300",
   lightweight: "bg-lime-100 text-lime-900 border-lime-300",
   edge: "bg-stone-100 text-stone-900 border-stone-300",
   balanced: "bg-sky-100 text-sky-900 border-sky-300",
   default: "bg-amber-100 text-amber-900 border-amber-300",
   openclaw: "bg-gradient-to-r from-blue-100 to-purple-100 text-slate-900 border-blue-300",
 };

const maxSize = Math.max(...models.map((m) => m.size));

function RamIndicator({ isDarkMode }) {
  const usableModels = models.filter((m) => m.size <= SYSTEM_RAM).length;
  const ramUsagePercent = (Math.max(...models.filter(m => m.size <= SYSTEM_RAM).map(m => m.size)) / SYSTEM_RAM) * 100;

  return (
    <div className={`rounded-xl p-4 mb-6 ${
      isDarkMode 
        ? "bg-slate-800/50 border border-slate-700/50" 
        : "bg-white border border-gray-200 shadow-sm"
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <MemoryStick size={20} className="text-green-400" />
          </div>
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-help">
              <span className={`font-semibold ${
                isDarkMode ? "text-slate-200" : "text-gray-800"
              }`}>System RAM:</span>
              <span className="text-green-500 font-bold text-lg">{SYSTEM_RAM} GB</span>
              <Info size={14} className={`${isDarkMode ? "text-slate-500" : "text-gray-400"}`} />
            </div>
            <p className={`text-sm ${
              isDarkMode ? "text-slate-500" : "text-gray-600"
            }`}>{usableModels} of {models.length} models fit in memory</p>
            
            <div className={`absolute left-0 top-full mt-2 w-80 p-3 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40 ${
              isDarkMode 
                ? "bg-slate-700 text-slate-200 shadow-xl border border-slate-600" 
                : "bg-gray-800 text-gray-100 shadow-xl"
            }`}>
              <p className="font-semibold text-blue-400 mb-2">RAM + VRAM Explained:</p>
              <ul className="space-y-2 text-left">
                <li>
                  <span className="font-medium text-emerald-400">Smaller models:</span> System RAM can handle spillover if VRAM is insufficient, but with slower performance.
                </li>
                <li>
                  <span className="font-medium text-amber-400">Large/multimodal models:</span> VRAM is almost always the bottleneck. Offloading to RAM often makes real-time interaction unusable.
                </li>
                <li>
                  <span className="font-medium text-purple-400">Combined memory:</span> RAM + VRAM sum can allow a model to run, but best experience requires sufficient VRAM.
                </li>
              </ul>
              <div className={`absolute -top-2 left-6 border-8 border-transparent ${
                isDarkMode ? "border-b-slate-700" : "border-b-gray-800"
              }`} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-400 text-sm font-medium">All listed models compatible</span>
        </div>
      </div>
    </div>
  );
}

function ModelCard({ model, onCopy, copiedId, isDarkMode }) {
  const sizePercentage = (model.size / maxSize) * 100;
  const isCopied = copiedId === model.id;
  const exceedsRam = model.size > SYSTEM_RAM;

  const getSizeColor = (size) => {
    if (exceedsRam) return "bg-red-500";
    if (size < 15) return "bg-emerald-500";
    if (size < 30) return "bg-blue-500";
    if (size < 60) return "bg-amber-500";
    return "bg-orange-500";
  };

  return (
    <div
      className={`relative rounded-xl p-5 transition-all duration-300 ${
        isDarkMode
          ? `bg-slate-800/50 hover:bg-slate-800/80 hover:border-slate-600 ${
              model.isDefault 
                ? "border-amber-500/50 ring-1 ring-amber-500/20" 
                : exceedsRam 
                  ? "border-red-500/50 ring-1 ring-red-500/20"
                  : "border-slate-700/50"
            }`
          : `bg-white hover:bg-gray-50 shadow-sm hover:shadow-md ${
              model.isDefault 
                ? "border-amber-400 ring-1 ring-amber-400/30" 
                : exceedsRam 
                  ? "border-red-400 ring-1 ring-red-400/30"
                  : "border-gray-200"
            }`
      } border hover:shadow-lg hover:shadow-blue-500/5`}
    >
      {model.isDefault && (
        <div className={`absolute -top-2.5 left-4 px-2.5 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1 ${
          isDarkMode ? "bg-amber-500 text-slate-900" : "bg-amber-400 text-white"
        }`}>
          <Sparkles size={12} />
          Recommended Default
        </div>
      )}

      {exceedsRam && (
        <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
          <AlertTriangle size={12} />
          Exceeds RAM
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3 mt-1">
        <h3 className={`font-mono text-sm font-medium break-all leading-relaxed ${
          isDarkMode ? "text-slate-200" : "text-gray-800"
        }`}>
          {model.name}
        </h3>
        <button
          onClick={() => onCopy(model.id, model.name)}
          className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
            isCopied
              ? "bg-emerald-500/20 text-emerald-400"
              : isDarkMode
                ? "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
          }`}
          title="Copy model name"
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className={`flex items-center gap-1.5 ${
          isDarkMode ? "text-slate-400" : "text-gray-600"
        }`}>
          <Cpu size={14} className="text-blue-500" />
          <span>{model.parameters}</span>
        </div>
        <div className={`flex items-center gap-1.5 ${
          exceedsRam ? "text-red-500" : isDarkMode ? "text-slate-400" : "text-gray-600"
        }`}>
          <HardDrive size={14} className={exceedsRam ? "text-red-500" : "text-purple-500"} />
          <span>{model.size} GB</span>
          {exceedsRam && <AlertTriangle size={12} className="text-red-500" />}
        </div>
        {model.equivalentTo && (
          <div className="relative group ml-auto">
            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md cursor-help ${
              isDarkMode 
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                : "bg-blue-50 text-blue-600 border border-blue-200"
            }`}>
              <Info size={12} />
              <span className="text-xs font-medium">≈ Flagship</span>
            </div>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 ${
              isDarkMode 
                ? "bg-slate-700 text-slate-100 shadow-lg" 
                : "bg-gray-800 text-white shadow-lg"
            }`}>
              <div className="text-center">
                <span className="text-blue-400">Equivalent to:</span>
                <br />
                {model.equivalentTo}
              </div>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent ${
                isDarkMode ? "border-t-slate-700" : "border-t-gray-800"
              }`} />
            </div>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-xs ${
            isDarkMode ? "text-slate-500" : "text-gray-500"
          }`}>Size</span>
          <span className={`text-xs ${
            exceedsRam ? "text-red-500" : isDarkMode ? "text-slate-500" : "text-gray-500"
          }`}>
            {model.size} GB {exceedsRam && `(>${SYSTEM_RAM} GB limit)`}
          </span>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${
          isDarkMode ? "bg-slate-700/50" : "bg-gray-200"
        }`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${getSizeColor(model.size)}`}
            style={{ width: `${sizePercentage}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-0.5 text-xs rounded-md border ${
              isDarkMode
                ? (tagColors[tag] || "bg-slate-600/20 text-slate-400 border-slate-600/30")
                : (tagColorsLight[tag] || "bg-gray-100 text-gray-800 border-gray-300")
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className={`pt-3 border-t ${
        isDarkMode ? "border-slate-700/50" : "border-gray-200"
      }`}>
        <p className={`text-xs mb-1 ${
          isDarkMode ? "text-slate-500" : "text-gray-500"
        }`}>Recommended for</p>
        <p className={`text-sm ${
          isDarkMode ? "text-slate-300" : "text-gray-700"
        }`}>{model.recommendedFor}</p>
      </div>
    </div>
  );
}

function FilterChip({ category, isActive, onClick, isDarkMode }) {
  const Icon = category.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
          : isDarkMode
            ? "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 border border-slate-700/50"
            : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-300"
      }`}
    >
      <Icon size={14} />
      {category.label}
    </button>
  );
}

export default function ModelPickerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("size-asc");
  const [copiedId, setCopiedId] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCopy = async (id, name) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const filteredAndSortedModels = useMemo(() => {
    let result = [...models];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (model) =>
          model.name.toLowerCase().includes(query) ||
          model.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((model) =>
        model.tags.some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "size-asc":
          return a.size - b.size;
        case "size-desc":
          return b.size - a.size;
        case "params-asc":
          return a.paramSort - b.paramSort;
        case "params-desc":
          return b.paramSort - a.paramSort;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, activeCategory, sortBy]);

  const currentSortLabel = sortOptions.find((opt) => opt.id === sortBy)?.label;

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-900 text-slate-100" 
        : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Cpu size={24} className="text-blue-400" />
              </div>
              <h1 className={`text-2xl font-semibold ${
                isDarkMode ? "text-slate-100" : "text-gray-900"
              }`}>Local LLM Model Picker</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" 
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <p className={`ml-12 ${
            isDarkMode ? "text-slate-400" : "text-gray-600"
          }`}>Browse and select from your locally available models</p>
        </div>

        <RamIndicator isDarkMode={isDarkMode} />

        <div className={`rounded-xl p-4 mb-6 ${
          isDarkMode 
            ? "bg-slate-800/30 border border-slate-700/50" 
            : "bg-white border border-gray-200 shadow-sm"
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDarkMode ? "text-slate-500" : "text-gray-400"
              }`} />
              <input
                type="text"
                placeholder="Search models by name or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 transition-all ${
                  isDarkMode
                    ? "bg-slate-900/50 border border-slate-700/50 text-slate-200 placeholder-slate-500 focus:border-blue-500/50 focus:ring-blue-500/25"
                    : "bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/25"
                }`}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg transition-all min-w-48 ${
                  isDarkMode
                    ? "bg-slate-900/50 border border-slate-700/50 text-slate-300 hover:border-slate-600"
                    : "bg-gray-50 border border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <span className="text-sm">{currentSortLabel}</span>
                <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
              </button>

              {showSortDropdown && (
                <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl z-20 overflow-hidden ${
                  isDarkMode
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-white border border-gray-200"
                }`}>
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        sortBy === option.id
                          ? "bg-blue-500/20 text-blue-500 font-medium"
                          : isDarkMode
                            ? "text-slate-300 hover:bg-slate-700/50"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <FilterChip
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className={isDarkMode ? "text-slate-400" : "text-gray-600"}>
            Showing <span className={`font-medium ${
              isDarkMode ? "text-slate-200" : "text-gray-900"
            }`}>{filteredAndSortedModels.length}</span> of{" "}
            <span className={`font-medium ${
              isDarkMode ? "text-slate-200" : "text-gray-900"
            }`}>{models.length}</span> models
          </p>
          {searchQuery || activeCategory !== "all" ? (
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {filteredAndSortedModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAndSortedModels.map((model) => (
              <ModelCard key={model.id} model={model} onCopy={handleCopy} copiedId={copiedId} isDarkMode={isDarkMode} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className={`p-4 rounded-full mb-4 ${
              isDarkMode ? "bg-slate-800/50" : "bg-gray-100"
            }`}>
              <Search size={32} className={isDarkMode ? "text-slate-600" : "text-gray-400"} />
            </div>
            <h3 className={`text-lg font-medium mb-2 ${
              isDarkMode ? "text-slate-300" : "text-gray-700"
            }`}>No models found</h3>
            <p className={`mb-4 ${
              isDarkMode ? "text-slate-500" : "text-gray-500"
            }`}>Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}

        <div className={`mt-8 pt-6 border-t ${
          isDarkMode ? "border-slate-800" : "border-gray-200"
        }`}>
          <div className={`flex flex-wrap items-center justify-center gap-6 text-sm ${
            isDarkMode ? "text-slate-500" : "text-gray-600"
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>{"< 15 GB"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>15-30 GB</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span>30-60 GB</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span>60-70 GB</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>{"> 70 GB (Exceeds RAM)"}</span>
            </div>
          </div>
          
          <div className={`mt-6 pt-4 border-t text-center ${
            isDarkMode ? "border-slate-800" : "border-gray-200"
          }`}>
            <p className={`text-xs italic ${
              isDarkMode ? "text-slate-600" : "text-gray-400"
            }`}>
              Disclaimer: Flagship model equivalents are based on personal assessment as of February 3rd, 2026.
              <br />
              Comparisons reflect performance on corresponding specialized tasks (e.g., coding, reasoning, writing) and may vary by use case.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
