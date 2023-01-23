import './DropDownMenu.css'
import { dropDownMenus } from "../data";

const DropDownMenuFrontPage = () => {
    return (
        <div className="bottom-portion-middle">
            {dropDownMenus.map(menu => (
                <div className='social-container'>
                    <div style={{borderBottom: '1px solid white'}}>{menu.heading}</div>
                    <ul>
                        {menu.options.map(option => (
                            <li style={{ listStyle: 'none' }}>
                                <a style={{  textDecoration:'none', color: 'white'}} href={option.link}>
                                    <div> * {option.optionHeading}</div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
};

export default DropDownMenuFrontPage;
