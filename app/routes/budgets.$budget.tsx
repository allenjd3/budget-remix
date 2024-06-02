import {Outlet} from "@remix-run/react";
import {Card, CardContent, CardHeader, CardTitle} from "~/components/ui/card";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {Button} from "~/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";

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
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input/>
              </div>
              <div>
                <Label>Price</Label>
                <Input/>
              </div>
              <div>
                <Button>Add Transaction</Button>
              </div>
            </div>
            <section className="mt-16">
              <Table>
                <TableHeader>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Second Transaction</TableCell>
                    <TableCell>$5.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>First Transaction</TableCell>
                    <TableCell>$25.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Second Transaction</TableCell>
                    <TableCell>$5.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>First Transaction</TableCell>
                    <TableCell>$25.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Second Transaction</TableCell>
                    <TableCell>$5.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>
          </CardContent>
        </Card>
      </aside>
    </section>
  </div>
}
