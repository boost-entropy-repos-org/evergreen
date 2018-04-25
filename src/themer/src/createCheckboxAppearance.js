import createAppearance from './createAppearance'
import missingStateWarning from './missingStateWarning'

const defaultState = '& + div'
const disabledState = '&[disabled] + div'
const hoverState = '&:not([disabled]):hover + div'
const focusState = '&:not([disabled]):focus + div'
const activeState = '&:not([disabled]):active + div'
const checkedState = '&:checked + div'
const checkedActiveState = '&:not([disabled]):checked:active + div'
const checkedDisabledState = '&[disabled]:checked + div'

const hiddenCheckboxStyle = {
  border: '0',
  clip: 'rect(1px, 1px, 1px, 1px)',
  height: '1',
  overflow: 'hidden',
  padding: '0',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1',
  opacity: '0'
}

const checkedStyles = {
  '& > svg': {
    display: 'block'
  }
}

/**
 * @param {object} items - object with a set of items.
 * @return {object} the final appearance.
 */
const createCheckboxAppearance = (items = {}) => {
  missingStateWarning({
    items,
    props: [
      'base',
      'hover',
      'focus',
      'active',
      'disabled',
      'checked',
      'checkedDisabled',
      'checkedActive'
    ],
    cb: prop => {
      console.error(
        `Themer.createCheckboxAppearance() is missing a ${prop} state in items: `,
        items
      )
    }
  })

  return {
    ...hiddenCheckboxStyle,
    '& + div > svg': {
      display: 'none'
    },
    [defaultState]: createAppearance(items.base),
    [hoverState]: createAppearance(items.hover),
    [focusState]: createAppearance(items.focus),
    [activeState]: createAppearance(items.active),
    [disabledState]: createAppearance(items.disabled),
    [checkedState]: {
      ...checkedStyles,
      ...createAppearance(items.checked)
    },
    [checkedDisabledState]: {
      ...checkedStyles,
      ...createAppearance(items.checkedDisabled)
    },
    [checkedActiveState]: {
      ...checkedStyles,
      ...createAppearance(items.checkedActive)
    }
  }
}

export default createCheckboxAppearance