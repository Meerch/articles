import clsPopup from './popup.module.scss'

import { DropdownDirection } from '@/shared/types/ui'

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': clsPopup.optionsBottomLeft,
    'bottom right': clsPopup.optionsBottomRight,
    'top left': clsPopup.optionsTopLeft,
    'top right': clsPopup.optionsTopRight
}
