export const ManagementLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-6xl mx-auto p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold mb-1 text-foreground">관리 시스템</h1>
        <p className="text-muted-foreground text-sm">사용자와 게시글을 관리하세요</p>
      </div>
      <div className="bg-card border border-border p-2.5 rounded-lg">
        {children}
      </div>
    </div>
  );
};
