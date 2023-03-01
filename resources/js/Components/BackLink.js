import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {Link} from "@inertiajs/inertia-react";


export default function BackLink() {
    return (
        <Link href={route('homepage')} method="get" as="button" type="button" className="inline-block p-2">
            <ArrowBackOutlinedIcon className="text-gray-600" />
        </Link>
    )
}
