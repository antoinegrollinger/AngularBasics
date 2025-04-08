export interface Author {
  id: number,
  name: string
}

export interface Category {
  id: number,
  name: string
}

export interface News {
  id: number,
  title: string,
  description: string,
  author: Author,
  category: Category
}
