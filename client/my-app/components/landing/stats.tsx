const stats = [
    { label: "Appointments Managed", value: "50K+" },
    { label: "Hospitals Using MediQueue", value: "120+" },
    { label: "Avg. Wait Time Reduced", value: "65%" },
  ]
  
  export default function Stats() {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold text-primary">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  