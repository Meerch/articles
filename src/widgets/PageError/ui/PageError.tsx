import { FC } from 'react'
import cls from './PageError.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'

interface PageErrorProps {
    className?: string
}

export const PageError: FC<PageErrorProps> = ({ className }) => {
    const { t } = useTranslation()

    const reloadPage = () => {
        location.reload()
    }

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            {t('Произошла ошибка')}
            <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
        </div>
    )
}
