import TextField from '@mui/material/TextField';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {Link, usePage} from '@inertiajs/inertia-react';
import CategoryItem from "@/Components/Sidebars/CategoryItem";

export default function HomepageSidebar() {

    const categories = usePage().props.categories.data;

    return (
        <aside className="bg-gray-100 min-h-screen hidden md:block w-72 mr-5 pt-16 relative">
            <form action="" className="my-5 mx-4">
                <TextField
                    id="search"
                    type="search"
                    name="search"
                    maxLength="300"
                    arial-label="search"
                    placeholder="Search"
                    size="small"
                    sx={{ backgroundColor: "#fff" }}
                />
            </form>
            <div className="border-b border-gray-300 mx-4 mb-4" />
            <nav>
                <ul className="mb-4">
                    <p href={"/"} className="inline-flex w-full text-blue-700 items-center px-3.5 py-2">
                        <ListOutlinedIcon fontSize='small' /> <span className="ml-2 font-bold">Categories</span>
                    </p>

                    {
                        categories ? (
                            categories.map(category => <CategoryItem key={category.id} category={category} subCategories={category.subCategories} />)
                        ) : (
                            <>
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </>
                        )
                    }
                </ul>
                <div className="border-b border-gray-300 mx-4 mb-4" />
            </nav>
        </aside>
    )
}
