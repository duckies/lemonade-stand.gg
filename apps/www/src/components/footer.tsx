import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-[20rem]">
      <div className="container px-6 py-8">
        <div className="text-center text-muted-foreground text-sm">
          <span>
            <Copyright className="size-3.5 inline" /> 2024 Lemonade Stand
          </span>
        </div>
      </div>
    </footer>
  );
}
