import { ReactNode, useCallback } from 'react'
import cls from './Tabs.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Card, CardTheme } from '../Card/Card'
import { typedMemo } from 'shared/lib/hocs/typedMemo/typedMemo'

export interface TabItem<T extends string> {
    value: T
    content: ReactNode
}

interface TabsProps<T extends string> {
    className?: string
    tabs: Array<TabItem<T>>
    value: T
    onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
    const { className, onTabClick, tabs, value } = props

    const clickHandle = useCallback((tab: TabItem<T>) => () => {
        onTabClick(tab)
    }, [onTabClick])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {
                tabs.map(tab => (
                    <Card
                        onClick={clickHandle(tab)}
                        theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                        key={tab.value}
                        className={cls.tab}
                    >
                        {tab.content}
                    </Card>
                ))
            }
        </div>
    )
})
