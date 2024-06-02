import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {Button} from "~/components/ui/button";
import type {
  Category as CategoryType,
  Item as ItemType,
} from "~/types";

export default function Category({category}: {category: CategoryType}) {
  return <Card>
    <CardHeader>
      <CardTitle>{category.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableHead className="w-3/4">Name</TableHead>
          <TableHead>Planned</TableHead>
          <TableHead>Spent</TableHead>
        </TableHeader>
        <TableBody>
          {
            category.items.map((item) => {
              const planned = '$' + Number(item.planned / 100).toFixed(2)
              const remaining = '$' + Number(item.remaining / 100).toFixed(2)
              return <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{planned}</TableCell>
                <TableCell>{remaining}</TableCell>
              </TableRow>
            })
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>$525.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </CardContent>
    <CardFooter className="space-x-4">
      <Button>Add new item</Button>
      <Button variant={'secondary'}>New Transaction</Button>
    </CardFooter>
  </Card>
}
