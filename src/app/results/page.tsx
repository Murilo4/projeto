import { Footer } from "../footer";
import Header from "../header";
import Search from "./search";
export default function searchPlaces () {
    return (
        <div className="searchPlaces">
            <Header />
            <Search />
            <Footer />
        </div>
    )
    
}