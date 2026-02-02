import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function AppointmentInfo() {
  return (
    <Card className="bg-primary/10 border-primary/30 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-primary font-semibold">
          Before You Book
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-[15px] text-muted-foreground">
        <p>• Ensure doctor availability for selected date</p>
        <p>• You may cancel up to 2 hours before the appointment</p>
        <p>• Bring previous medical records if available</p>
        <p>• A confirmation message will be sent after approval</p>
      </CardContent>
    </Card>
  )
}
