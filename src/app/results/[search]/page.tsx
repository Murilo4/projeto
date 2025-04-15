import { Footer } from "../../footer";
import Header from "../../header";
import TopBar from "./barrasuperior";
import Search from "./search";
export default function searchPlaces() {
    return (
        <div className="min-h-screen mt-20">
            <Header />
            <TopBar />
            <div className="flex justify-center">
                <div className="flex gap-6 max-w-6xl w-full border-blue-thirth">
                    <Search />
                </div>
            </div>
            <Footer />
        </div>
    )

}