"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
    electiveData,
    filterElectives,
    getDepartments,
    getStats,
    getDifficultyLevel,
    getCoursePageUrl,
    type Elective
} from "@/lib/electives";
import {
    Search,
    GraduationCap,
    Users,
    TrendingUp,
    TrendingDown,
    Building2,
    ExternalLink,
    Info,
    BookOpen,
    X,
    Command
} from "lucide-react";

// Command Search Modal
function CommandSearch({
    isOpen,
    onClose,
    onSelect
}: {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (elective: Elective) => void;
}) {
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const results = query.length > 0
        ? electiveData.filter(e =>
            e.name.toLowerCase().includes(query.toLowerCase()) ||
            e.code.toLowerCase().includes(query.toLowerCase()) ||
            e.department.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
        : electiveData.slice(0, 8);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            setQuery("");
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Global escape key handler
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Scroll selected item into view
    useEffect(() => {
        if (listRef.current) {
            const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
            selectedEl?.scrollIntoView({ block: "nearest" });
        }
    }, [selectedIndex]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
                break;
            case "Enter":
                e.preventDefault();
                if (results[selectedIndex]) {
                    onSelect(results[selectedIndex]);
                    onClose();
                }
                break;
            case "Escape":
                onClose();
                break;
        }
    }, [results, selectedIndex, onSelect, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative max-w-2xl mx-auto mt-[15vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center border-b border-white/10 px-4">
                        <Search className="h-5 w-5 text-neutral-500 shrink-0" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search electives..."
                            className="flex-1 bg-transparent py-4 px-3 text-white placeholder:text-neutral-500 outline-none text-lg"
                        />
                        <button
                            onClick={onClose}
                            className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                            <X className="h-4 w-4 text-neutral-500" />
                        </button>
                    </div>

                    {/* Results */}
                    <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
                        {results.length === 0 ? (
                            <div className="px-4 py-8 text-center text-neutral-500">
                                No electives found for "{query}"
                            </div>
                        ) : (
                            results.map((elective, idx) => {
                                const difficulty = getDifficultyLevel(elective.lowestCGPA);
                                return (
                                    <button
                                        key={`${elective.code}-${elective.type}-${idx}`}
                                        data-index={idx}
                                        onClick={() => { onSelect(elective); onClose(); }}
                                        className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${idx === selectedIndex
                                            ? "bg-white/10"
                                            : "hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="shrink-0 mt-0.5">
                                            <GraduationCap className="h-5 w-5 text-neutral-500" />
                                        </div>
                                         <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-neutral-500">{elective.code}</span>
                                                {(() => {
                                                    const courseUrl = getCoursePageUrl(elective.code);
                                                    return courseUrl ? (
                                                        <ExternalLink className="h-3 w-3 text-emerald-400" />
                                                    ) : (
                                                        <Info className="h-3 w-3 text-neutral-600" />
                                                    );
                                                })()}
                                                <span className="text-xs font-mono text-neutral-300 bg-neutral-700 px-1.5 py-0.5 rounded">
                                                    {elective.type}
                                                </span>
                                            </div>
                                            {(() => {
                                                const courseUrl = getCoursePageUrl(elective.code);
                                                if (courseUrl) {
                                                    return (
                                                        <a
                                                            href={courseUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-white font-medium truncate mt-0.5 hover:text-neutral-200 hover:underline block"
                                                        >
                                                            {elective.name}
                                                        </a>
                                                    );
                                                }
                                                return (
                                                    <div className="text-neutral-400 font-medium truncate mt-0.5">
                                                        {elective.name}
                                                    </div>
                                                );
                                            })()}
                                            <div className="text-xs text-neutral-500 mt-0.5">
                                                {elective.department} • Min CGPA: <span className={`font-mono ${difficulty.color}`}>{elective.lowestCGPA.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className={`text-xs font-medium shrink-0 ${difficulty.color}`}>
                                            {difficulty.level}
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-white/10 px-4 py-2 flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400 font-mono">↑</kbd>
                            <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400 font-mono">↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400 font-mono">↵</kbd>
                            Select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400 font-mono">esc</kbd>
                            Close
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Stats Card Component
function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
}: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
}) {
    return (
        <Card className="relative overflow-hidden border-white/10 bg-neutral-900/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-neutral-400">{title}</CardTitle>
                <Icon className="h-4 w-4 text-neutral-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                {subtitle && <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>}
            </CardContent>
        </Card>
    );
}

// Elective Card Component
function ElectiveCard({ elective, isHighlighted }: { elective: Elective; isHighlighted?: boolean }) {
    const difficulty = getDifficultyLevel(elective.lowestCGPA);
    const courseUrl = getCoursePageUrl(elective.code);

    return (
        <Card
            id={`elective-${elective.code}-${elective.type}`}
            className={`group relative overflow-hidden border-white/5 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80 ${isHighlighted ? "ring-2 ring-white/30 border-white/30" : ""
                }`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <Badge
                        variant="secondary"
                        className="text-xs font-mono bg-neutral-800 text-neutral-300 border-0"
                    >
                        {elective.type}
                    </Badge>
                    {courseUrl ? (
                        <a
                            href={courseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >
                            <Badge variant="outline" className="text-xs font-mono border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300 cursor-pointer">
                                {elective.code}
                                <ExternalLink className="ml-1 h-3 w-3" />
                            </Badge>
                        </a>
                    ) : (
                        <Badge variant="outline" className="text-xs font-mono border-neutral-700 text-neutral-400">
                            {elective.code}
                            <Info className="ml-1 h-3 w-3" />
                        </Badge>
                    )}
                </div>
                {courseUrl ? (
                    <a
                        href={courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-200 transition-colors"
                    >
                        <CardTitle className="text-base font-semibold leading-tight mt-2 line-clamp-2 text-white hover:underline">
                            {elective.name}
                        </CardTitle>
                    </a>
                ) : (
                    <CardTitle className="text-base font-semibold leading-tight mt-2 line-clamp-2 text-neutral-400">
                        {elective.name}
                    </CardTitle>
                )}
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Min CGPA</div>
                        <div className={`text-lg font-bold font-mono ${difficulty.color}`}>
                            {elective.lowestCGPA.toFixed(2)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Max CGPA</div>
                        <div className="text-lg font-semibold font-mono text-neutral-300">
                            {elective.highestCGPA.toFixed(2)}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Students</div>
                        <div className="text-lg font-semibold font-mono text-neutral-300">
                            {elective.students}
                        </div>
                    </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">Difficulty</span>
                        <span className={`font-medium ${difficulty.color}`}>{difficulty.level}</span>
                    </div>
                    {/* CGPA Range Bar */}
                    <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full"
                            style={{
                                marginLeft: `${(elective.lowestCGPA / 10) * 100}%`,
                                width: `${((elective.highestCGPA - elective.lowestCGPA) / 10) * 100}%`
                            }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-600 mt-1 font-mono">
                        <span>0</span>
                        <span>5</span>
                        <span>10</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ElectiveDashboard() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [deptFilter, setDeptFilter] = useState("all");
    const [sortBy, setSortBy] = useState<"name" | "cutoff" | "students">("cutoff");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [commandOpen, setCommandOpen] = useState(false);
    const [highlightedElective, setHighlightedElective] = useState<string | null>(null);

    const stats = useMemo(() => getStats(), []);
    const departments = useMemo(() => getDepartments(), []);

    const filteredElectives = useMemo(() => {
        return filterElectives(
            typeFilter,
            deptFilter,
            search,
            sortBy,
            sortOrder
        );
    }, [typeFilter, deptFilter, search, sortBy, sortOrder]);

    // Keyboard shortcut for Ctrl+K (toggle)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setCommandOpen(prev => !prev);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleSelectElective = useCallback((elective: Elective) => {
        // Clear filters to show the elective
        setSearch("");
        setTypeFilter("all");
        setDeptFilter("all");

        // Highlight and scroll to the elective
        const id = `elective-${elective.code}-${elective.type}`;
        setHighlightedElective(id);

        // Wait for render then scroll
        setTimeout(() => {
            const element = document.getElementById(id);
            element?.scrollIntoView({ behavior: "smooth", block: "center" });

            // Remove highlight after animation
            setTimeout(() => setHighlightedElective(null), 2000);
        }, 100);
    }, []);

    const toggleSort = (newSortBy: typeof sortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortBy(newSortBy);
            setSortOrder("asc");
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950">
            {/* Command Search Modal */}
            <CommandSearch
                isOpen={commandOpen}
                onClose={() => setCommandOpen(false)}
                onSelect={handleSelectElective}
            />

            {/* Hero Section */}
            <div className="relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
                <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                            Elective Cutoff Analysis
                        </h1>
                        <p className="mt-3 text-lg text-neutral-400 max-w-2xl mx-auto">
                            Explore CGPA cutoffs for Open Electives (OE) and Program Electives (PE I & PE II)
                            to make informed course selection decisions.
                        </p>

                        {/* Quick Search Button */}
                        <button
                            onClick={() => setCommandOpen(true)}
                            className="mt-5 inline-flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-white/10 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 transition-colors text-sm"
                        >
                            <Search className="h-4 w-4" />
                            <span>Search...</span>
                            <kbd className="ml-1 px-1.5 py-0.5 bg-neutral-800 rounded text-xs font-mono text-neutral-500 flex items-center gap-0.5">
                                <Command className="h-2.5 w-2.5" />K
                            </kbd>
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard
                            title="Total Electives"
                            value={stats.totalElectives}
                            subtitle={`${stats.oeCount} OE • ${stats.pe1Count} PE I • ${stats.pe2Count} PE II`}
                            icon={BookOpen}
                        />
                        <StatCard
                            title="Departments"
                            value={stats.departments}
                            subtitle="Offering electives"
                            icon={Building2}
                        />
                        <StatCard
                            title="Lowest Cutoff"
                            value={stats.lowestCutoff.toFixed(2)}
                            subtitle="Easiest to get"
                            icon={TrendingDown}
                        />
                        <StatCard
                            title="Highest Cutoff"
                            value={stats.highestCutoff.toFixed(2)}
                            subtitle="Most competitive"
                            icon={TrendingUp}
                        />
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-xl border-b border-white/5 pt-2">
                <div className="max-w-7xl mx-auto px-3 pb-2.5 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-2">
                        {/* Search */}
                        <div className="w-full sm:flex-1 sm:min-w-[200px]">
                            <Input
                                placeholder="Search electives..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-9 bg-neutral-900/70 border-white/10 text-white placeholder:text-neutral-500"
                            />
                        </div>

                        {/* Type and Department Filters - side by side on mobile */}
                        <div className="flex w-full gap-2">
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="h-9 flex-1 bg-neutral-900/70 border-white/10 text-neutral-300 text-xs">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="OE">Open Elective</SelectItem>
                                    <SelectItem value="PE I">PE I</SelectItem>
                                    <SelectItem value="PE II">PE II</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={deptFilter} onValueChange={setDeptFilter}>
                                <SelectTrigger className="h-9 flex-1 bg-neutral-900/70 border-white/10 text-neutral-300 text-xs">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Depts</SelectItem>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sort Buttons */}
                        <div className="flex gap-1.5">
                            <button
                                onClick={() => toggleSort("cutoff")}
                                className={`h-9 px-3 rounded-md text-xs font-medium transition-colors ${sortBy === "cutoff"
                                    ? "bg-white text-neutral-900"
                                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
                                    }`}
                            >
                                Cutoff {sortBy === "cutoff" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                onClick={() => toggleSort("students")}
                                className={`h-9 px-3 rounded-md text-xs font-medium transition-colors ${sortBy === "students"
                                    ? "bg-white text-neutral-900"
                                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
                                    }`}
                            >
                                Students {sortBy === "students" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                            <button
                                onClick={() => toggleSort("name")}
                                className={`h-9 px-3 rounded-md text-xs font-medium transition-colors ${sortBy === "name"
                                    ? "bg-white text-neutral-900"
                                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
                                    }`}
                            >
                                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                        {filteredElectives.length} Elective{filteredElectives.length !== 1 ? 's' : ''} Found
                    </h2>
                    {search || typeFilter !== "all" || deptFilter !== "all" ? (
                        <button
                            onClick={() => { setSearch(""); setTypeFilter("all"); setDeptFilter("all"); }}
                            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
                        >
                            Clear Filters
                        </button>
                    ) : null}
                </div>

                {/* Electives Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredElectives.map((elective, idx) => (
                        <ElectiveCard
                            key={`${elective.code}-${elective.type}-${idx}`}
                            elective={elective}
                            isHighlighted={highlightedElective === `elective-${elective.code}-${elective.type}`}
                        />
                    ))}
                </div>

                {filteredElectives.length === 0 && (
                    <div className="text-center py-16">
                        <GraduationCap className="mx-auto h-12 w-12 text-neutral-700" />
                        <h3 className="mt-4 text-lg font-medium text-neutral-300">No electives found</h3>
                        <p className="text-neutral-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-white/5 py-8 text-center text-sm text-neutral-500">
                <p>Data based on actual student allocations. Cutoffs may vary each semester.</p>
                <p className="mt-1">Use this as a reference, not a guarantee.</p>
                <p className="mt-4">
                    Made by <a href="https://lverma.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">Lakshit Verma</a> and <a href="https://aadit.cc" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">Aadit Agrawal</a>
                </p>
            </footer>
        </div>
    );
}
