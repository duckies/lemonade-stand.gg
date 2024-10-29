interface HeroProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function Hero({ title, subtitle, children }: Readonly<HeroProps>) {
  return (
    <div className="flex items-center justify-between space-y-2 mt-[8rem] mb-20">
      <div className="bg-[url(https://wow.zamimg.com/uploads/screenshots/normal/1165800.jpg)] absolute top-0 left-0 h-[400px] right-0 bg-cover after:from-background/50 after:to-background after:bg-gradient-to-b after:from-50% after:content-[''] after:inset-0 after:absolute" />
      <div className="text-center lg:text-left w-full relative">
        <h1 className="text-6xl mb-2 font-serif font-bold tracking-wide">{title}</h1>
        <p className="text-muted-foreground text-xl">{subtitle}</p>
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  );
}
