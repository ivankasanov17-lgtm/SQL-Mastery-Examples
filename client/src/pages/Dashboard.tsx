import { Sidebar } from "@/components/Sidebar";
import { ExampleCard } from "@/components/ExampleCard";
import { useLocation } from "wouter";
import { Search, Loader2, Menu } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Patterns } from "@/lib/Patterns";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const examples = Patterns;
  const isLoading = false;
  const error = null;
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const getDialectFromPath = (path: string) => {
    if (path === "/") return "all";
    const parts = path.split("/");
    if (parts[1] === "patterns") return decodeURIComponent(parts[2]);
    return "all";
  };

  const currentDialect = getDialectFromPath(location);

  const filteredExamples = examples?.filter((ex) => {
    const matchesDialect =
      currentDialect === "all" || ex.dialect === currentDialect;
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.code.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDialect && matchesSearch;
  });

  const categoryTitles: Record<string, string> = {
    all: "Библиотека SQL паттернов",
    SQL: "Standard SQL Examples",
    SQLite: "SQLite Specifics",
    "T-SQL": "T-SQL / SQL Server",
    PostgreSQL: "PostgreSQL Advanced",
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <Sidebar className="h-full" />
      </div>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 md:py-12">
          {/* Header Section */}

          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-center justify-between md:hidden mb-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                SQL Mastery
              </h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display tracking-tight">
                  {categoryTitles[currentDialect] || "Examples"}
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Browse production-ready database query examples.
                </p>
              </div>

              <div className="w-full md:w-auto relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search examples..."
                  className="pl-9 w-full md:w-[300px] bg-card border-border/50 focus:border-primary/50 transition-all rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Content Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
              <p>Loading your library...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive">
              <h3 className="font-semibold">Error loading examples</h3>
              <p className="text-sm mt-1">{(error as Error).message}</p>
            </div>
          ) : filteredExamples?.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                No examples found
              </h3>
              <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                Try adjusting your search terms or select a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {filteredExamples?.map((example, index) => (
                <ExampleCard key={example.id} example={example} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
