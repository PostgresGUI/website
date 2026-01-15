export function LoadingFallback({ text = "Loading lesson..." }: { text?: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-muted-foreground">{text}</div>
    </div>
  );
}
