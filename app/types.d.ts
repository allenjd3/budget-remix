export type Category = {
  name: string,
  items: Item[],
}

export type Item = {
  name: string,
  planned?: int,
  remaining?: int,
}
