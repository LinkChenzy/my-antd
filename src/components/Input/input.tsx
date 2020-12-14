import React, { FC, ReactElement, InputHTMLAttributes } from 'react'
import cs from 'classnames'

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'> {
    // 是否禁用
    disabled?: boolean,
    // input 大小
    size?: InputSize,
    // 添加前缀
    prepend?: string | ReactElement,
    // 添加后缀
    append?: string | ReactElement,
    // onChange?: 
}

export const Input: FC<InputProps> = props => {
    // 属性
    const { disabled, size, prepend, append, style, ...restProps } = props
    // 根据属性 选取className
    const classes = cs('linkin-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })

    // 优化受控组件和非受控组件 value 和 defaultValue
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null){
            return ''
        } 
        return value
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div className={classes} style={style}>
            { prepend && <span className='viking-input-group-prepend'>{ prepend }</span> }
            <input className='linkin-input-inner' disabled={disabled} {...restProps} />
            { append && <span className='viking-input-group-append'>{ append }</span> }
        </div>
    )
}