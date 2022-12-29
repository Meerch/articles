import cls from './ArticleImageBlockComponent.module.scss'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextAlign } from '@/shared/ui/Text'
import { ArticleImageBlock } from '../../model/types/article'

interface ArticleImageBlockProps {
    className?: string
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockProps) => {
    const { className, block } = props

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} className={cls.image}/>
            {block.title && <Text className={cls.text} text={block.title} align={TextAlign.CENTER}/>}
        </div>
    )
})