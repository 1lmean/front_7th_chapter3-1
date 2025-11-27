interface ManagementStatCardProps {
  label: string;
  value: number;
  variant?: "blue" | "green" | "orange" | "red" | "gray";
}

const variantStyles = {
  blue: "bg-blue-50 border-blue-300 text-blue-600 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300",
  green: "bg-green-50 border-green-300 text-green-600 dark:bg-green-900 dark:border-green-700 dark:text-green-300",
  orange: "bg-orange-50 border-orange-300 text-orange-600 dark:bg-orange-900 dark:border-orange-700 dark:text-orange-300",
  red: "bg-red-50 border-red-300 text-red-600 dark:bg-red-900 dark:border-red-700 dark:text-red-300",
  gray: "bg-muted border-border text-muted-foreground",
};

export const ManagementStatCard = ({
  label,
  value,
  variant = "blue",
}: ManagementStatCardProps) => {
  return (
    <div 
      className={`px-4 py-3 border rounded shadow-[--shadow-sm] hover:shadow-[--shadow-md] transition-shadow duration-[--duration-normal] ${variantStyles[variant]}`}
    >
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-2xl font-bold">
        {value}
      </div>
    </div>
  );
};
