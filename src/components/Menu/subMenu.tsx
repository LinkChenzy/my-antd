import React, { useContext, FunctionComponentElement, useState } from 'react'
import cs from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = props => {
    const { index, title, className, children } = props
    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [ open, setOpen ] = useState(isOpend) // 切换sub 展开收起
    const classes = cs('menu-item submenu-item', className, {
        'is-active': context.index === index
    })
    // 点击事件
    const handleClick = (e: React.MouseEvent) => {
        setOpen(!open)
    }

    // 鼠标滑过事件
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(()=>{
            setOpen(toggle)
        },300)
    }

    // vertical mode click event
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    // horizontal mode mouse event
    const mouserEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e,true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    // 渲染元素
    const renderChildren = () => {
        const subClass = cs('linkin-submenu', {
            'menu-opened': open
        })
        const childrenComponent = React.Children.map(children, (child,i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            }else{
                console.error('Waring: Menu has a child which is not a MenuItem component')
            }
        })
        return <ul className={subClass}>
            {childrenComponent}
        </ul>
    }
    return <li key={index} className={classes} {...mouserEvents}>
        <div className='submenu-title' {...clickEvents}>
            {title}
        </div>
        {renderChildren()}
    </li>
}

SubMenu.displayName = 'SubMenu'

export default SubMenu