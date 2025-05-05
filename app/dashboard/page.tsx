"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Define the Customer type
type Customer = {
  id: string;
  name: string;
  phone: string;
  services: string[];
  lastvisit?: string;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  // const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();

  // Check session and fetch customers
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
  
      if (!session) {
        router.push("/login");
        return;
      }
  
      setUserEmail(session.user.email?? '');
      setLoading(false);
      const owner_id = (await supabase.auth.getSession()).data.session?.user.id ;
  
      const { data, error } = await supabase.from("customers").select("*").eq("owner_id", owner_id);
  
      if (error) {
        console.error("Error fetching customers:", error.message);
      } else {
        console.log("Fetched customers:", data);
        setCustomers(data || []);
      }
    };
    setLoading(false);
    init();
  }, [router]);
  

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  const serviceCounts = customers.reduce((acc, customer) => {
    const serviceList = Array.isArray(customer.services) && customer.services.length > 0
      ? customer.services
      : ["Unknown"];
  
    serviceList.forEach((service: string) => {
      acc[service] = (acc[service] || 0) + 1;
    });
  
    return acc;
  }, {} as Record<string, number>);
  
  
  // Prepare data for charts
  const pieData = Object.entries(serviceCounts).map(([service, count]) => ({
    name: service,
    value: count,
  }));

  const barData = Object.entries(serviceCounts).map(([service, count]) => ({
    service,
    count,
  }));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-[#fef9f7]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Welcome & CTA */}
      <div className="flex justify-between items-center w-full mb-8">
        <p className="text-lg">Welcome back, {userEmail}</p>
        <Link href="/contact-details">
          <Button
            variant="outline"
            className="rounded-full px-6 py-4 text-base border-black text-black hover:bg-gray-100"
          >
            Add Customer
          </Button>
        </Link>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Visits by Service</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 border-b font-semibold">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Services</th>
              <th className="py-3 px-4">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{customer.name}</td>
                  <td className="py-3 px-4">{customer.phone}</td>
                  <td className="py-3 px-4">{customer.services}</td>
                  <td className="py-3 px-4">{customer.lastvisit || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-3">No customers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
