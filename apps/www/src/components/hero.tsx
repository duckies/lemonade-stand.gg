interface HeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function Hero({ title, subtitle, children }: Readonly<HeroProps>) {
  return (
    <div className="flex items-center justify-between space-y-2 my-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
