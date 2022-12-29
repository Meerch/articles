import { memo } from 'react'
import cls from './ArticleCodeBlockComponent.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/Code'
import { ArticleCodeBlock } from '../../model/types/article'

interface ArticleCodeBlockProps {
    className?: string
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockProps) => {
    const { className, block } = props

    return (
        <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
            <Code text={block.code}/>
        </div>
    )
})
