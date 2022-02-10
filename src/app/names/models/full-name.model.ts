export interface FullName {
  name: string,
  surname: string,
}

export interface FullNameStorage extends FullName {
  index: number
}