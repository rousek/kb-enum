export interface GetSingleEnumParamsInt {
  lang?: 'en' | 'cs',
  order?: 'ascending' | 'descending',
  orderBy?: 'code' | 'name' | 'description',
  additionalInfo?: boolean
}

export interface GetEnumsParamsInt extends GetSingleEnumParamsInt {
  fetchAllEnumerationItems?: boolean,
}

export interface EnumValueInt {
  code: string,
  name?: string,
  description?: string,
  validFrom?: string, // yyyy-mm-dd
  validTo?: string,
  additionalInfo?: { [key: string]: string }
}

export interface EnumInt {
  enumerationName: string,
  enumerationItemDtos?: EnumValueInt[]
}
