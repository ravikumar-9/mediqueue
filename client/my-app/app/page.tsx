import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Stethoscope,
  CalendarDays,
  Ambulance,
  PhoneCall,
  CheckCircle,
  MapPin,
  Star,
} from "lucide-react"
import { ModeToggle } from "@/components/toggle-theme"

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-muted border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">HealthCare+</h1>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-primary">Features</a>
            <a href="#doctors" className="text-sm font-medium hover:text-primary">Doctors</a>
            <a href="#about" className="text-sm font-medium hover:text-primary">About</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary">Contact</a>
          </div>
          <div className="flex items-center gap-4">
          <Button className="rounded-xl h-10">Book Now</Button>
          <ModeToggle/>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-24 px-6 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div className="space-y-6">
            <h1 className="text-5xl font-extrabold leading-tight">
              Your Health, <span className="text-primary">Our Responsibility</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Consult top doctors anytime, anywhere. Book appointments instantly with trusted healthcare professionals.
            </p>

            <div className="flex gap-4">
              <Button className="h-12 px-8 rounded-xl text-base">Book Appointment</Button>
              <Button variant="outline" className="h-12 px-8 rounded-xl text-base">Explore</Button>
            </div>
          </div>

          <Image
            src="https://images.pexels.com/photos/8460030/pexels-photo-8460030.jpeg"
            alt="Doctor"
            width={600}
            height={600}
            className="rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6 md:px-16 lg:px-32">
        <h2 className="text-4xl font-bold text-center mb-16">Our Key Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Feature icon={<CalendarDays className="h-10 w-10 text-primary" />} title="Instant Booking" desc="Schedule your appointment in just a few clicks." />
          <Feature icon={<Stethoscope className="h-10 w-10 text-primary" />} title="Expert Doctors" desc="Specialists across 20+ departments." />
          <Feature icon={<Ambulance className="h-10 w-10 text-primary" />} title="Emergency Care" desc="24/7 emergency support anytime." />
          <Feature icon={<PhoneCall className="h-10 w-10 text-primary" />} title="Teleconsultation" desc="Video consultation from home." />
          <Feature icon={<MapPin className="h-10 w-10 text-primary" />} title="Nearby Centers" desc="Locate clinics and labs instantly." />
          <Feature icon={<CheckCircle className="h-10 w-10 text-primary" />} title="Secure Records" desc="Your data is safe and encrypted." />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-16 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <Image
            src="https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg"
            alt="Hospital"
            width={550}
            height={550}
            className="rounded-2xl shadow-lg object-cover"
          />

          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Top-Class Medical Facilities</h2>
            <p className="text-muted-foreground text-lg">
              Our hospital is equipped with modern infrastructure, advanced machines,
              and experienced staff to provide world-class care.
            </p>

            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2"><CheckCircle className="text-primary" /> ISO Certified Infrastructure</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-primary" /> 100+ Expert Doctors</li>
              <li className="flex items-center gap-2"><CheckCircle className="text-primary" /> 24/7 Pharmacy & Labs</li>
            </ul>

            <Button className="mt-4 rounded-xl px-8 h-12">Learn More</Button>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section id="doctors" className="py-24 px-6 md:px-16 lg:px-32">
        <h2 className="text-4xl font-bold text-center mb-14">Meet Our Specialists</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <DoctorCard
            name="Dr. Anil Kumar"
            spec="Cardiologist"
            image="https://images.pexels.com/photos/8460085/pexels-photo-8460085.jpeg"
          />
          <DoctorCard
            name="Dr. Sneha Reddy"
            spec="Dermatologist"
            image="https://images.pexels.com/photos/8460151/pexels-photo-8460151.jpeg"
          />
          <DoctorCard
            name="Dr. Mahesh Verma"
            spec="Orthopedic Surgeon"
            image="https://images.pexels.com/photos/5327915/pexels-photo-5327915.jpeg"
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 md:px-16 lg:px-32 rounded-3xl mx-4 md:mx-12">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Patients Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <TestimonialCard
            name="Rohit Sharma"
            review="Excellent care! Doctors were patient, friendly, and very professional."
            image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          />

          <TestimonialCard
            name="Priya Singh"
            review="I booked an appointment in seconds. The service is super convenient!"
            image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
          />

          <TestimonialCard
            name="Vijay Rao"
            review="The hospital facilities are world-class. Highly recommended!"
            image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 lg:px-32 text-center">
        <h2 className="text-4xl font-bold">Ready to Book an Appointment?</h2>
        <p className="text-muted-foreground mt-2 text-lg">Our experts are here to help you.</p>

        <Button className="mt-6 h-12 px-10 rounded-xl text-lg">Book Now</Button>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-10 bg-primary/5 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} HealthCare+. All rights reserved.
      </footer>

    </div>
  )
}

/* COMPONENTS */
function Feature({ icon, title, desc }: any) {
  return (
    <div className="p-8 rounded-2xl bg-card shadow-lg border hover:shadow-xl transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}

function DoctorCard({ name, spec, image }: any) {
  return (
    <div className="rounded-2xl shadow-md border bg-card p-5 hover:shadow-xl transition-all">
      <Image
        src={image}
        alt={name}
        width={300}
        height={300}
        className="rounded-xl object-cover h-56 w-full"
      />
      <h3 className="text-xl font-semibold mt-4">{name}</h3>
      <p className="text-muted-foreground">{spec}</p>
    </div>
  )
}

function TestimonialCard({ name, review, image }: any) {
  return (
    <div className="p-6 rounded-2xl bg-card shadow-md hover:shadow-xl border transition-all">
      <div className="flex items-center gap-4">
        <Image
          src={image}
          width={60}
          height={60}
          className="rounded-full object-cover"
          alt={name}
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex text-yellow-500 gap-1">
            <Star fill="yellow" className="h-4 w-4" />
            <Star fill="yellow" className="h-4 w-4" />
            <Star fill="yellow" className="h-4 w-4" />
            <Star fill="yellow" className="h-4 w-4" />
            <Star fill="yellow" className="h-4 w-4" />
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mt-4">{review}</p>
    </div>
  )
}
