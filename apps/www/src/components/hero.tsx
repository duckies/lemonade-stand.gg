interface HeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function Hero({ title, subtitle, children }: Readonly<HeroProps>) {
  return (
    <div className="flex items-center justify-between space-y-2 mt-[8rem] mb-20">
      <div className="text-center lg:text-left w-full">
        <h1 className="text-5xl mb-2 font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-xl">{subtitle}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
