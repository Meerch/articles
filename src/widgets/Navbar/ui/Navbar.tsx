import React, { FC, useCallback, useState } from 'react'
import cls from './Navbar.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Modal } from 'shared/ui/Modal/Modal'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onToggleModal = useCallback(() => {
        setIsAuthModal(prev => !prev)
    }, [])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>

            <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                {t('Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy Testy')}
            </Modal>
        </div>
    )
}
