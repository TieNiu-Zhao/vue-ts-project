// 定义响应数据的类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 定义已有品牌 ts 类型
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}
// 定义全部品牌数据的 ts 类型
export type Records = TradeMark[]
// 获取已有全部品牌的数据
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
