import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Database, Server, FolderCode, Terminal } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  const currentFullPath = currentPath + (currentSearch || "");

  const patternItems = [
    { name: "Все паттерны", id: "all", href: "/", icon: FolderCode },
    { name: "Standard SQL", id: "SQL", href: "/patterns/SQL", icon: Database },
    {
      name: "PostgreSQL",
      id: "PostgreSQL",
      href: "/patterns/PostgreSQL",
      icon: Server,
    },
    { name: "T-SQL", id: "T-SQL", href: "/patterns/T-SQL", icon: Terminal },
    { name: "SQLite", id: "SQLite", href: "/patterns/SQLite", icon: Database },
  ];

  const referenceItems = [
    {
      name: "Справочник SQL",
      id: "ref-SQL",
      href: "/reference/SQL",
      icon: Database,
    },
    {
      name: "Справочник PostgreSQL",
      id: "ref-PostgreSQL",
      href: "/reference/PostgreSQL",
      icon: Server,
    },
    {
      name: "Справочник T-SQL",
      id: "ref-T-SQL",
      href: "/reference/T-SQL",
      icon: Terminal,
    },
    {
      name: "Справочник SQL Graph",
      id: "ref-SQL-Graph",
      href: "/reference/SQL-Graph",
      icon: Terminal,
    },
    {
      name: "Справочник SQLite",
      id: "ref-SQLite",
      href: "/reference/SQLite",
      icon: Database,
    },
  ];
  const shemaItems=[
    { name: "Схемы SQL", id: "schema SQL", href: "/schema/sql", icon: FolderCode },
  ]

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card border-r border-border/50",
        className,
      )}
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          SQL Mastery
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Database patterns reference
        </p>
      </div>

      <div className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
        <div>
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Библиотека паттернов
          </h3>
          <nav className="space-y-1">
            {patternItems.map((item) => {
              const isActive = currentPath === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-4 w-4 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary",
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Справочник
          </h3>
          <nav className="space-y-1">
            {referenceItems.map((item) => {
              const isActive = currentFullPath === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-4 w-4 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary",
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-2">
            Схемы
          </h3>
          <nav className="space-y-1">
            {shemaItems.map((item)=>{
              
              const isActive = currentFullPath === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-4 w-4 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-primary",
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-border/50">
        <div className="bg-secondary/50 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-foreground">Pro Tip</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Use these templates to optimize your database queries.
          </p>
        </div>
      </div>
    </div>
  );
}
