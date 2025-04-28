import { Footer } from "../../footer";
import Header from "../../header";
import ValidationPlacePage from "./validate";
export default function searchPlaces() {
    return (
        <div className="min-h-screen mt-20">
            <Header />
            <div className="flex justify-center">
                <div className="flex gap-6 max-w-6xl w-full border-blue-thirth">
                    <ValidationPlacePage />
                </div>
            </div>
            <Footer />
        </div>
    )

}