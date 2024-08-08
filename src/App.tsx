import { Toaster } from "react-hot-toast";
import Form from "./Form/FormZod";

const App = () => {
    return (
        <>
            <Toaster />
            <div className="mx-auto md:w-96">
                <Form />
            </div>
        </>
    );
};

export default App;
