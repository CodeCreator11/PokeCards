import React from 'react'
import * as FaIcons from 'react-icons/fa'
import scss from './nav.module.scss'
import logo from '../../assets/logo.jpg'

const Nav = ({getSearch}) => {


    return (
        <div className={scss.nav}>
            <div className={scss.div_nav}>
                <div className={scss.logo}>
                    <img src={logo} alt="logo" />
                </div>
                {/* <div>
                    <h3>By John Ruiz</h3>
                </div> */}
                <div className={scss.input}>
                    <div className={scss.lupita}>
                        <FaIcons.FaSearch/>
                    </div>
                    <input className={scss.input2} type="search" onChange={(e) => getSearch(e.target.value)}/>
                </div>
            </div>
            <div>
                <h3>By John Ruiz</h3>
            </div>
        </div>
    )
}

export default Nav
