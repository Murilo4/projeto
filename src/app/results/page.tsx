import { Footer } from "../footer";
import Header from "../header";
import TopBar from "./barrasuperior";
import Filters from "./filters";
import Search from "./search";
export default function searchPlaces () {
    return (
        <div className="min-h-screen bg-white-background mt-32">
            <Header />
            <TopBar />
            <div className="flex justify-center">
                <div className="flex gap-8 max-w-6xl w-full border-blue-thirth">
                    <Filters />
                    <Search />
                </div>
            </div>
            <Footer />
        </div>
    )
    
}