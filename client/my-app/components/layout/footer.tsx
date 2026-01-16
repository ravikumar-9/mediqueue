export default function Footer() {
    return (
      <footer className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediQueue. All rights reserved.
        </div>
      </footer>
    )
  }
  