export enum ArticleBlockType {
    IMAGE = 'IMAGE',
    CODE = 'CODE',
    TEXT = 'TEXT',
}

export interface ArticleBaseBlock {
    id: string
    type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBaseBlock {
    type: ArticleBlockType.CODE
    code: string
}

export interface ArticleTextBlock extends ArticleBaseBlock {
    type: ArticleBlockType.TEXT
    title?: string
    paragraphs: string[]
}

export interface ArticleImageBlock extends ArticleBaseBlock {
    type: ArticleBlockType.IMAGE
    src: string
    title: string
}

export type ArticleBlock = ArticleCodeBlock | ArticleTextBlock | ArticleImageBlock

export enum ArticleType {
    IT = 'IT',
    SCIENCE = 'SCIENCE',
    ECONOMICS = 'ECONOMICS',
}

export interface Article {
    blocks: ArticleBlock[]
    type: ArticleType[]
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
}