import { Footer } from "../../footer";
import Header from "../../header";
import Search from "./search";
export default function searchPlaces() {
    return (
        <div className="min-h-screen mt-20">
            <Header />
                    <Search />
            <Footer />
        </div>
    )

}