import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SQL } from "@/lib/SQL.ts";
import { PostgreSQL } from "@/lib/PostgreSQL.ts";
import { SQLite } from "@/lib/SQLite.ts";
import { TSQL } from "@/lib/TSQL.ts";
import { SQLGraph } from "@/lib/SQLGraph.ts";
import { ShemaSQL } from "@/lib/ShemaSQL.ts";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { importantPostgreSQLMethods } from "@/lib/PostgreSQL.ts";

interface Argument {
  name: string;
  description: string;
  example?: string;
}

interface Term {
  id: string;
  name: string;
  category: string;
  description: string;
  example: string;
  syntax?: string;
  arguments?: Argument[];
  fragments?:Argument[];
  supportedDatabases?: string[];
  schemaName:string;
  schemaDefinition:string;
}

const dialectTerms: Record<string, Term[]> = {
  SQL: SQL,
  PostgreSQL: PostgreSQL,
  SQLite: SQLite,
  "T-SQL": TSQL,
  "Схемы SQL": ShemaSQL,
};

export default function DialectPage({ title }: { title: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [location] = useLocation();

  // Reset selected term when dialect or category changes
  useEffect(() => {
    setSelectedTerm(null);
    setShowImportantOnly(false);
  }, [title, location]);

  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const categoryFilter = searchParams.get("category");

  let currentTerms = dialectTerms[title] || [];

  if (title === "SQL-Graph") {
    currentTerms = SQLGraph;
  }

  const filteredByCategory = categoryFilter
    ? currentTerms.filter((t) => t.category === categoryFilter)
    : currentTerms;

  const filteredByImportance = (title === "PostgreSQL" && showImportantOnly)
    ? filteredByCategory.filter((term) => importantPostgreSQLMethods.includes(term.name))
    : filteredByCategory;

  const filteredTerms = filteredByImportance.filter(
    (term) =>
      (term.name || term.schemaName).toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const categories = Array.from(new Set(filteredTerms.map((t) => t.category)));
  const MobileNav = () => (
    <div className="flex items-center justify-between md:hidden mb-6">
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
  );

  if (selectedTerm) {
    return (
      <div className="flex h-screen bg-background overflow-hidden">
        <div className="hidden md:block w-72 h-full flex-shrink-0">
          <Sidebar className="h-full" />
        </div>
        <main className="flex-1 h-full overflow-y-auto relative p-6">
          <div className="mx-auto">
            <Button
              variant="ghost"
              onClick={() => setSelectedTerm(null)}
              className="mb-6"
            >
              ← Назад к списку
            </Button>
            <h1 className="text-4xl font-bold mb-2">{selectedTerm.name || selectedTerm.schemaName}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <p className="text-primary font-medium">
                {selectedTerm.category}
              </p>
              {selectedTerm.supportedDatabases && selectedTerm.supportedDatabases.length > 0 && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.supportedDatabases.map((db, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20"
                      >
                        {db}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Card className="mb-8 border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle>Описание и Синтаксис</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed mb-6">
                  {selectedTerm.description} 
                </p>
                {(selectedTerm.syntax || selectedTerm.schemaDefinition) && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Синтаксис 
                    </h3>
                    <pre className="bg-secondary/50 p-4 rounded-xl font-mono text-sm border border-border">
                      {selectedTerm.syntax || selectedTerm.schemaDefinition} 
                    </pre>
                  </div>
                )}
                {(selectedTerm.arguments?.length || selectedTerm.fragments?.length) ? (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Аргументы
                      </h3>
                      <div className="space-y-4">
                        {(selectedTerm.arguments || selectedTerm.fragments || []).map((arg, idx) => (
                          <div
                            key={idx}
                            className="bg-card border rounded-xl p-4 shadow-sm"
                          >
                            <div className="font-mono text-sm font-bold text-primary mb-1">
                              {arg.name}
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">
                              {arg.description}
                            </div>
                            {arg.example && (
                              <div className="bg-muted/50 p-3 rounded-lg text-xs font-mono border border-border/50 italic">
                                Пример: {arg.example}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
              </CardContent>
            </Card>

            {selectedTerm.example && (
              <Card className="border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle>Общий пример использования</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-xl font-mono text-sm whitespace-pre-wrap border border-border">
                    {selectedTerm.example}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <Sidebar className="h-full" />
      </div>
      <main className="flex-1 h-full overflow-y-auto relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 md:py-12">
          <MobileNav />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Справочник {title}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Подробная документация по функциям и операторам.
              </p>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
              {title === "PostgreSQL" && (
                <Button
                  variant={showImportantOnly ? "default" : "outline"}
                  onClick={() => setShowImportantOnly(!showImportantOnly)}
                  className="w-full md:w-auto rounded-xl"
                >
                  {showImportantOnly ? "Показать все" : "Важные методы"}
                </Button>
              )}
              <div className="w-full md:w-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск по терминам..."
                  className="pl-9 w-full md:w-[300px] rounded-xl bg-card"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryTerms = filteredTerms.filter(
                (t) => t.category === category
              );
              if (categoryTerms.length === 0) return null;
              return (
                <div key={category}>
                  <h2 className="text-xl font-semibold mb-6 text-primary border-b border-primary/20 pb-2">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryTerms.map((term) => (
                      <button
                        key={term.id}
                        onClick={() => setSelectedTerm(term)}
                        className="flex items-center justify-between p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all text-left group"
                      >
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {term.name || term.schemaName}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
