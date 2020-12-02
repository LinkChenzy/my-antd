import React from 'react'
import cs from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

// button基本属性
interface BaseButtonProps {
    className? : string;
    disabled? : boolean;    // disabled
    size? : string;     // 大小
    btnType? : string;      // 类型
    children : React.ReactNode;     // 子元素
    href? : string      // 链接
}

// 添加原生button和a的属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

// https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
    const { btnType, disabled, size, children,href, className, ...restprops } = props
    // class 设置
    const classes = cs('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled,
    },className) // 自定义的class
    // 返回a标签的形式
    if(btnType === ButtonType.Link && href){
        return <a
            className={classes}
            href={href}
            {...restprops}
        >{children}</a>
    } else {    // 正常返回button的形式
        return <button
            className={classes}
            disabled={disabled}
            {...restprops}
        >
            {children}
        </button>
    }
}
// 默认属性
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button
