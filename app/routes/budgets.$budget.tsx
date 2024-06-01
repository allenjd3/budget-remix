import {Outlet} from "@remix-run/react";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";

export default function Budget() {
  return <div>
    <Card>
      <CardHeader>
        <CardTitle>Jan 2024</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="bg-blue-300 border-blue-400">
          <CardHeader>
            <CardTitle className="text-blue-800">$500.00</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-amber-100 border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">$500.00</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">$500.00</CardTitle>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-8 gap-8">
      <div className="lg:col-span-3">
        <Outlet />
      </div>
      <aside>
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            One Two
          </CardContent>
        </Card>
      </aside>

    </section>
  </div>
}
