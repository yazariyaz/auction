import {Link} from "@inertiajs/inertia-react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import {useState} from "react";


export default function CategoryItem({category, subCategories}){

    const [showSubCategory, setShowSubCategory] = useState(false);

    return (
        <li className="pl-4 pr-2 py-2 relative cursor-pointer">
            <div className="flex items-center font-semibold justify-between hover:text-blue-700" onClick={() => setShowSubCategory(!showSubCategory)}>
                {category.name}

                <span className="cursor-pointer text-gray-500">
                    {
                        showSubCategory ? (<KeyboardArrowUpOutlinedIcon />) : (<KeyboardArrowDownOutlinedIcon />)
                    }
                </span>
            </div>

            <div className={`pl-2 ${showSubCategory ? 'h-28 overflow-y-auto pb-2 ' : 'h-0 overflow-y-hidden'} overflow-hidden transition-[height] duration-300 ease-in  thin-scrollbar`}>
                <ul className="text-sm">
                    {
                        subCategories.map(subCategory => (
                            <li className="py-1" key={subCategory.id}>
                                <Link href={"/"} className="">
                                    {subCategory.name}
                                </Link>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </li>
    )
}
