import {TabsItem} from "./TabsItem";

export const Tabs = ({ list, activeTab, onTabSwitch}) => {
    let active = activeTab === '' ? list[0] : activeTab;

    return (
        <div className="sticky z-1900 w-full">
            <div className="container flex justify-around w-full py-2">
                {list.map((item, index) => {
                    return (
                        <TabsItem 
                            title={item}
                            key={index}
                            index={index}
                            active={active === item}
                            setActive={onTabSwitch}
                        />
                    )
                })}
            </div>
        </div>
    )
}