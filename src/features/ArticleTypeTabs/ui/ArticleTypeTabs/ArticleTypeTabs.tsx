import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ArticleType } from '../../../../entities/Article/model/consts/articleConsts'

import { classNames } from '@/shared/lib/classNames/classNames'
import { TabItem, Tabs } from '@/shared/ui/Tabs'

interface ArticleTypeTabsProps {
    className?: string
    value: ArticleType
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props
    const { t } = useTranslation('articles')
    const typeTabs = useMemo<Array<TabItem<ArticleType>>>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все статьи')
        },
        {
            value: ArticleType.IT,
            content: t('Айти')
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика')
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука')
        }
    ], [t])

    const onTabClick = useCallback((tab: TabItem<ArticleType>) => {
        onChangeType(tab.value)
    }, [onChangeType])

    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onTabClick}
        />
    )
})