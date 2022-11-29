import { memo, useCallback } from 'react'
import cls from './AddCommentForm.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import {
    getAddCommentFormText
} from '../../model/selectors/addCommentFormSelectors'
import { HStack } from 'shared/ui/Stack'

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
            <HStack justify='between' max className={classNames(cls.addCommentForm, {}, [className])}>
                <Input
                    className={cls.input}
                    onChange={onCommentTextChange}
                    value={text}
                    placeholder={t('Введите свой комментарий')}
                />
                <Button onClick={handlerSendComment}>
                    {t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>
    )
})

export default AddCommentForm