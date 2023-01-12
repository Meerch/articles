import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { detectDevice } from '@/shared/lib/detectDevice/detectDevice'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Drawer } from '@/shared/ui/Drawer'
import { Input } from '@/shared/ui/Input'
import { Modal } from '@/shared/ui/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating'
import { Text } from '@/shared/ui/Text'

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void
    rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        onCancel,
        feedbackTitle,
        title,
        onAccept,
        rate = 0,
        hasFeedback
    } = props
    const { t } = useTranslation()
    const isMobile = detectDevice()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starsCount, setStarsCount] = useState(rate)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount)
        if (hasFeedback) {
            setIsModalOpen(true)
        } else {
            onAccept?.(selectedStarsCount)
        }
    }, [hasFeedback, onAccept])

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(starsCount, feedback)
    }, [feedback, onAccept, starsCount])

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(starsCount)
    }, [onCancel, starsCount])

    const modalContent = (
        <>
            <Text title={feedbackTitle}/>
            <Input
                value={feedback}
                data-testid='RatingCard.Input'
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    )

    return (
        <Card
            data-testid='RatingCard'
            className={className}
            max
        >
            <VStack align='center' gap='8'>
                <Text title={starsCount ? t('Спасибо за оценку!') : title}/>
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars}/>
            </VStack>
            {
                isMobile
                    ? <Drawer
                        isOpen={isModalOpen}
                        onClose={cancelHandler}
                        lazy
                    >
                        <VStack max gap='32'>
                            {modalContent}
                            <Button
                                data-testid="RatingCard.Send"
                                size={ButtonSize.L}
                                onClick={acceptHandler}
                                fullWidth
                            >
                                {t('Отправить')}
                            </Button>
                        </VStack>
                    </Drawer>
                    : <Modal onClose={cancelHandler} isOpen={isModalOpen} lazy>
                        <VStack max gap='32'>
                            {modalContent}
                            <HStack max gap='16' justify='end'>
                                <Button
                                    data-testid="RatingCard.Close"
                                    onClick={cancelHandler}
                                    theme={ButtonTheme.OUTLINE_RED}>
                                    {t('Закрыть')}
                                </Button>
                                <Button
                                    data-testid="RatingCard.Send"
                                    onClick={acceptHandler}
                                >
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </VStack>
                    </Modal>
            }
        </Card>
    )
})