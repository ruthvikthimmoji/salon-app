import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe5d9] text-gray-800">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold font-orbitron mb-6 leading-tight">
          Style & Shine Salon
        </h1>
        <p className="text-xl md:text-2xl mb-10">
          Manage your salon effortlessly – track customers, send offers, and grow your business, all from one dashboard.
        </p>
        <Link href="/login">
          <Button className="rounded-full px-8 py-4 text-base bg-black text-white hover:bg-gray-800">
            Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div>
            <Image src="/CRM.jpg" alt="Customers" width={150} height={150} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Management</h3>
            <p>Keep track of all customer visits, services, and preferences.</p>
          </div>
          <div>
            <Image src="/offers.jpg" alt="Offers" width={150} height={150} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Offers</h3>
            <p>Send smart, personalized offers to increase retention.</p>
          </div>
          <div>
            <Image src="/BA.jpg" alt="Analytics" width={150} height={150} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Business Insights</h3>
            <p>Track your growth and service performance with real-time analytics.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-[#fff4ec]">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl font-bold">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="p-6 bg-white rounded-lg shadow-sm">
              <p className="italic">`&quot;`This tool helped us manage our salon like never before. Our revenue is up by 30!`&quot;`</p>
              <footer className="mt-4 text-sm font-medium">– Priya, Salon Owner</footer>
            </blockquote>
            <blockquote className="p-6 bg-white rounded-lg shadow-sm">
              <p className="italic">`&quot;`I love how easy it is to use. Sending offers takes seconds now`&quot;`</p>
              <footer className="mt-4 text-sm font-medium">– Ramesh, Hair Stylist</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Style & Shine Salon. All rights reserved.</p>
      </footer>
    </main>
  );
}
