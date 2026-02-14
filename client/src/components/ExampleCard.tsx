import { Example } from "@shared/schema";
import { CodeBlock } from "./CodeBlock";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface ExampleCardProps {
  example: Example;
  index: number;
}

export function ExampleCard({ example, index }: ExampleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex flex-col gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors uppercase text-[10px] tracking-wider font-semibold">
              {example.dialect}
            </Badge>
          </div>
          <h3 className="text-xl font-bold font-display text-foreground">{example.title}</h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">{example.description}</p>
        </div>
      </div>
      
      <div className="mt-2">
        <CodeBlock code={example.code} />
      </div>
    </motion.div>
  );
}
