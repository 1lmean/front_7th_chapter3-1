interface ManagementStatCardProps {
  label: string;
  value: number;
  variant?: "blue" | "green" | "orange" | "red" | "gray";
}

const variantStyles = {
  blue: "bg-blue-50 border-blue-300 text-blue-600",
  green: "bg-green-50 border-green-300 text-green-600",
  orange: "bg-orange-50 border-orange-300 text-orange-600",
  red: "bg-red-50 border-red-300 text-red-600",
  gray: "bg-gray-100 border-gray-300 text-gray-600",
};

export const ManagementStatCard = ({
  label,
  value,
  variant = "blue",
}: ManagementStatCardProps) => {
  return (
    <div className={`px-4 py-3 border rounded ${variantStyles[variant]}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div
        className={`text-2xl font-bold ${variantStyles[variant].split(" ")[2]}`}
      >
        {value}
      </div>
    </div>
  );
};
