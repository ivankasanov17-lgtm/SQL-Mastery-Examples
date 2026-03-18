import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import { practicalExamples, type PracticalExample, type TableData } from "@/lib/PracticalExamples";

function DataTable({ data, label }: { data: TableData; label?: string }) {
  return (
    <div className="mb-4">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {label}
        </p>
      )}
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60">
              {data.columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left font-semibold text-foreground whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-border/50 hover:bg-secondary/30 transition-colors"
              >
                {data.columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-muted-foreground whitespace-nowrap">
                    {row[col] === null ? (
                      <span className="italic text-muted-foreground/50">NULL</span>
                    ) : (
                      String(row[col])
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExampleDetail({
  example,
  onBack,
}: {
  example: PracticalExample;
  onBack: () => void;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <Sidebar className="h-full" />
      </div>
      <main className="flex-1 h-full overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 md:py-12">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            ← Назад к списку
          </Button>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground tracking-tight">
            {example.taskTitle}
          </h1>

          <Card className="mb-6 border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Условие задачи</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground">
                {example.taskDescription}
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Исходные таблицы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {example.beforeTables.map((t) => (
                <DataTable key={t.label} data={t.data} label={t.label} />
              ))}
            </CardContent>
          </Card>

          <Card className="mb-6 border-primary/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">SQL-запрос</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-xl font-mono text-sm whitespace-pre-wrap border border-border overflow-x-auto leading-relaxed">
                {example.query}
              </pre>
            </CardContent>
          </Card>

          <Card className="mb-6 border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Результат запроса</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={example.afterTable} />
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Пояснение</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground">
                {example.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function PracticalExamplesPage() {
  const [selected, setSelected] = useState<PracticalExample | null>(null);

  if (selected) {
    return <ExampleDetail example={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="hidden md:block w-72 h-full flex-shrink-0">
        <Sidebar className="h-full" />
      </div>

      <main className="flex-1 h-full overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 md:py-12">
          <div className="flex items-center justify-between md:hidden mb-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SQL Mastery
            </h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Практические примеры
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Разбор реальных задач с таблицами до и после запроса.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practicalExamples.map((example) => (
              <button
                key={example.id}
                onClick={() => setSelected(example)}
                className="flex flex-col justify-between p-5 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all text-left group"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {example.taskTitle.split("—")[0].trim()}
                  </p>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {example.shortTitle}
                  </span>
                </div>
                <div className="flex justify-end mt-4">
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
