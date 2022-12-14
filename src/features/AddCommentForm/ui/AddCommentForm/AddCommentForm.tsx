import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'

import cls from './AddCommentForm.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

export interface AddCommentFormProps {
    className?: string
    onSendComment: (value: string) => void
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo(({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const text = useSelector(getAddCommentFormText)

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch])

    const handlerSendComment = useCallback(() => {
        void onSendComment(text ?? '')
        onCommentTextChange('')
    }, [onCommentTextChange, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <HStack
                data-testid='AddCommentForm'
                justify='between'
                className={classNames(cls.addCommentForm, {}, [className])}
                max
            >
                <Input
                    className={cls.input}
                    onChange={onCommentTextChange}
                    value={text}
                    data-testid='AddCommentForm.Input'
                    placeholder={t('Введите свой комментарий')}
                />
                <Button
                    data-testid='AddCommentForm.Button'
                    theme={ButtonTheme.OUTLINE}
                    onClick={handlerSendComment}
                >
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    )
})

export default AddCommentForm