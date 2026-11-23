type Doc = { id: number }

//get the ID whether the relationship is populated or not.
export const relId = <T extends Doc>(value: number | T): number =>
  typeof value === 'object' ? value.id : value

// Get the document if the relationship is populated, otherwise null.
export const populated = <T extends Doc>(value: number | T | null | undefined): T | null =>
  typeof value === 'object' && value !== null ? value : null