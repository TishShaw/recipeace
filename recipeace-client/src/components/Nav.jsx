import {navItems} from '../data/CategoryData';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { Tabs } from './Tabs';

const Nav = () => {
    console.log(navItems);
    const [activeTab, setActiveTab] = useState('');
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const onTabSwitch = (newActiveTab) => {
        setActiveTab(newActiveTab);
        let currNavItem = navItems.map((navItem) => navItem.title);
        let index = currNavItem.findIndex(navEL => newActiveTab ===navEL);
        console.log(index);
        console.log(currNavItem)
        if (index > -1) {
            setActiveTabIndex(index);
        } else {
            setActiveTabIndex(0);
        }
    }
    return (
        <div className="navbar w-[100vw] py-6 rounded-t-3xl fixed bottom-0 left-0  shadow-2xl bg-gray-200 drop-shadow">
            <div className="relative text-xl w-[100vw] flex justify-around">
            { navItems &&
                <Tabs list={navItems.map((n, i) =>(
                    <div key={i}>
                        <Link to={n.route}> {n.title}</Link>
                    </div>
                ))} activeTab={activeTab} onTabSwitch={onTabSwitch} />}
            </div>
        </div>
    );
};

export default Nav;