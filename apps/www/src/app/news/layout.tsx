export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="container px-8">{children}</main>;
}
