import Category from "~/components/category";
import type {Category as CategoryType} from "~/types.d.ts"
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

const categories: CategoryType[] = [
  {
    name: 'Housing/Maintenance',
    items: [
      {name: 'Mortgage', planned: '50000', remaining: '50000'},
      {name: 'Filters', planned: '2500', remaining: '2500'},
    ]
  },
  {
    name: 'Stuff',
    items: [
      {name: 'more', planned: '50000', remaining: '50000'},
    ]
  }
]
export const loader = () => {
  return json({
    categories: categories
  });
}

export default function Items() {
  const {categories} = useLoaderData<typeof loader>()
  return <section className="space-y-8">
    {categories.map((category) => {
      return <Category category={category} key={category.name} />
    })}
  </section>
}
