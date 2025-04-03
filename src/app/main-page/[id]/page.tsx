import { Footer } from "../../footer";
import Header from "../../header";
import Main from "./main-item";

export default function searchPlaces () {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
            <Main />
            </div>
            <Footer />
        </div>
    )
    
}