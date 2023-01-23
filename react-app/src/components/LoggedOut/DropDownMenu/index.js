import './DropDownMenu.css'
import { dropDownMenus } from "../data";

const DropDownMenuFrontPage = () => {
    return (
        <div className="bottom-portion-middle">
            {dropDownMenus.map(menu => (
                <div>
                    <div>{menu.heading}</div>
                    <ul>
                        {menu.options.map(option => (
                            <li>
                                <a href={option.link}>
                                    <div>{option.optionHeading}</div>
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
