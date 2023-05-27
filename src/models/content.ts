interface IContent {
  id?: string
  title: string
  description: string
  price: number
  type: string
  images?: Array<string>
  tags: Array<string>
  authors?: Array<IPerson>
  parts: Array<IContent>
}
