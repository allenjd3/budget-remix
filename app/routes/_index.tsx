import type { MetaFunction } from "@remix-run/node";
import {Button} from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <div>
    <h1 className="text-3xl">Behold a button</h1>
    <Button>Here is a button</Button>
  </div>;
}
