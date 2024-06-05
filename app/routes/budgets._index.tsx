import {Button} from "~/components/ui/button";
import {Budget} from "@prisma/client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {Form, useLoaderData, useNavigate} from "@remix-run/react";
import {addDays, format} from "date-fns";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "~/components/ui/popover";
import {cn} from "~/lib/utils";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "~/components/ui/calendar";
import React from "react";
import {DateRange} from "react-day-picker";
import {ActionFunction, json, LoaderFunction} from "@remix-run/node";
import {getAuth} from "@clerk/remix/ssr.server";
import {BudgetRequest, createBudget, getBudgets} from "~/lib/budgets";

export const action: ActionFunction = async (args) => {
    const { userId } = await getAuth(args);
    const body = await args.request.formData()
    const formDataObj = Object.fromEntries(body.entries())
    const combinedData = {...formDataObj, userId}
    const budgetRequest = BudgetRequest.parse(combinedData)
    const budget = await createBudget(budgetRequest)
    console.log(budget)
    return json({})
}

export const loader: LoaderFunction = async (args) => {
  const {userId} = await getAuth(args)

  const budgets = await getBudgets({userId: userId ?? ''});
  return json({
    budgets
  })
}

export default function Index() {
  const {budgets} = useLoaderData<typeof loader>()

  const budgetList = budgets.length
    ? <ShowBudgets budgets={budgets} />
    : <ShowFallback />

  return <section className="max-w-screen-lg mx-auto">
    <div className="w-full">
      {budgetList}
      <div className="mt-8">
        <h2 className="text-2xl">Create Budget</h2>
        <Form method="post" className="space-y-4">
          <div>
            <Label htmlFor="label">Label</Label>
            <Input id="label" name="label" />
          </div>
          <div>
            <Label>Date Range</Label>
            <DatePickerWithRange />
          </div>
          <Button>Create Budget</Button>
        </Form>
      </div>
    </div>
  </section>
}

function ShowBudgets({budgets}: { budgets: Budget[] }) {
  const navigate = useNavigate()
  return <div>
    <Table>
      <TableHeader>
        <TableHead>Label</TableHead>
        <TableHead>Start Date</TableHead>
        <TableHead>End Date</TableHead>
      </TableHeader>
      <TableBody>
        {budgets.map((budget) => {
          const startDate = new Date(budget.startDate)
          const endDate = new Date(budget.endDate)
          return (
            <TableRow key={budget.id} onClick={() => navigate(`/budgets/${budget.id}`)}>
                <TableCell>{budget.label}</TableCell>
                <TableCell>{format(startDate, "MMMM d, yyyy")}</TableCell>
                <TableCell>{format(endDate, "MMMM d, yyyy")}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
}

function ShowFallback() {
  return <div>There are no budgets yet...</div>
}

function DatePickerWithRange({
  className,
}: {className?: string}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date,
    to: addDays(new Date, 30),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <input className="hidden" name="endDate" value={date ? format(date?.to ?? new Date, "yyyy-MM-dd") : ''}/>
      <input className="hidden" name="startDate" value={date ? format(date?.from ?? new Date, "yyyy-MM-dd") : ''}/>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
