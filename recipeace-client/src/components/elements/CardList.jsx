import { recipeCardData } from "../../data/CategoryData";

const CardList = () => {
    return (
        <div className="w-full flex flex-col overflow-x-scroll">
            <div className="w-[800px] flex justify-center overflow-x-scroll">
                {
                recipeCardData.map((r) => (
                    <div className="mr-8 relative flex items-center justify-center">
                        <img src={r.catImg} alt="" className="rounded-xl h-full object-cover" />
                        <div className="absolute top-[100px] bg-[#585555] bg-opacity-60 rounded-lg p-2 marker:shadow-md">
                            <div className="text-white text-xl">{r.title}</div>
                            <span className="text-[#C1C1C1] text-l">{r.calories} calories | {r.servings} servings</span>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default CardList;