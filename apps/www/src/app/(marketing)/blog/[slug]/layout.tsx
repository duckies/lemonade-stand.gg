export default function BlogPostLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-full flex-1">
      <div className="mt-10">{children}</div>
    </div>
  );
}
