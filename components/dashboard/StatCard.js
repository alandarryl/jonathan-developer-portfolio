import Card from "@/components/ui/Card";

export default function StatCard({ label, value, icon: Icon }) {
  return (
    <Card className="flex items-center justify-between p-6">
      <div>
        <p className="text-xs text-ink-400">{label}</p>
        <p className="mt-2 font-display text-2xl font-semibold text-ink-50">
          {value}
        </p>
      </div>
      {Icon && (
        <div className="rounded-lg bg-mint-400/10 p-2.5 text-mint-300">
          <Icon size={20} />
        </div>
      )}
    </Card>
  );
}
