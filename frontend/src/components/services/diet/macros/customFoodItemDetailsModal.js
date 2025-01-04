import React, { useState } from 'react';

const CustomFoodItemDetailsModal = ({ food, onClose }) => {
    const [foodName, setFoodName] = useState(food.foodName);
    const [quantity, setQuantity] = useState(food.intialData[0]);
    const [quantityType, setQuantityType] = useState(food.quantityType);
    const [protein, setProtein] = useState(food.intialData[1]);
    const [carbs, setCarbs] = useState(food.intialData[2]);
    const [fats, setFats] = useState(food.intialData[3]);
    const [calories, setCalories] = useState(food.intialData[4]);
    const [image, setImage] = useState(food.image);
    const [imageChanged, setImageChanged] = useState(false); // New state for tracking image changes
    const [imageFile, setImageFile] = useState(null);
    const [warning,setWarning] = useState("");
    const [isWarningVisible,setIsWarningVisible] = useState(false);
    const [fetchedMacros,setFetchedMacros] = useState(false);

    const validations = () => {

        let isValid = true;
        let warningMessage = "";

        if (!foodName.trim()) {
            isValid = false;
            warningMessage = "Food name cannot be empty.\n";
        }

        if (quantity <= 0) {
            isValid = false;
            warningMessage = "Quantity must be greater than zero.\n";
        }

        if (!quantityType) {
            isValid = false;
            warningMessage = "Quantity type must be selected.\n";
        }

        if (protein <= 0) {
            isValid = false;
            warningMessage = "Protein must be greater than zero.\n";
        }
        if (carbs <= 0) {
            isValid = false;
            warningMessage = "Carbs must be greater than zero.\n";
        }
        if (fats <= 0) {
            isValid = false;
            warningMessage = "Fats must be greater than zero.\n";
        }
        if (calories <= 0) {
            isValid = false;
            warningMessage = "Calories must be greater than zero.\n";
        }

        if (!isValid) {
            setWarning(warningMessage);
            setIsWarningVisible(true);
        }

        return isValid;

    }

    const handleSave = () => {

        setWarning("");
        setIsWarningVisible(false);

        // validations
        const isValid = validations();
        if(!isValid){
            return;
        }
        console.log("validations Done");

        //API call to check if food item name is already present
        if(false){
            setWarning("Food Name is already Present");
            setIsWarningVisible(true);
            return;
        }

        // Image name is always the fooditem name.
        // Log whether the image was changed or not
        // imageChanged keeps track of wheather user had changed the image
        console.log({
            foodName,
            quantity,
            quantityType,
            protein,
            carbs,
            fats,
            calories,
            image,
            isImageChanged: imageChanged ? 'Image was changed' : 'Image was not changed',
            imageFile: imageFile? imageFile:"No Image file"
        });
        

        if(imageChanged){
            // use food name for 
            // Image flow:
            // We store image in S3, get its address and then store that against food item in db
            // when new image is added, we first erase the old image from S3 with the initial link
            // the we send this new image to S3 and get its S3 link and update it against the fooditem in db.
            setImage("new image link");
        }

        // API call to update the data

        onClose();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setImageFile(file);
            setImageChanged(true); // Set imageChanged to true when a new image is selected
            console.log(`Selected image: ${file.name}`);
        }
    };

    const handleGetMacrosData = () => {

        setWarning("");
        setIsWarningVisible(false);

        let isValid = true;
        let warningMessage = "";

        if (!foodName.trim()) {
            isValid = false;
            warningMessage = "Food name cannot be empty.\n";
        }

        if (quantity <= 0) {
            isValid = false;
            warningMessage = "Quantity must be greater than zero.\n";
        }

        if (!quantityType) {
            isValid = false;
            warningMessage = "Quantity type must be selected.\n";
        }

        if (!isValid) {
            setWarning(warningMessage);
            setIsWarningVisible(true);
            return;
        }

        setFetchedMacros(true);
        // API call to get macros given food name, quantity and quantity type
        // if no macro data found set warning as no macro data found
        if(true){
            setWarning("Macros Not Found !!!")
            setIsWarningVisible(true);
            setTimeout(()=>{
                setWarning("");
                setIsWarningVisible(false);
            },3000);
        }else{
            setProtein(100);
            setCarbs(100);
            setFats(100);
            setCalories(100);
        }
        
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => onClose()}
        >
            <div
                className="relative mx-4 md:mx-6 lg:mx-8 mt-10 border-2 border-red-500 bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-xl w-full h-auto overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {isWarningVisible && 
                    <div
                        className="absolute top-0 left-0 right-0 text-white text-center py-2 bg-red-500">
                        {warning}
                    </div>
                }
                {/* Image */}
                <div className="flex items-center justify-center mx-auto mb-4 mt-10">
                    <div className="relative">
                        <img
                            src={image}
                            alt={food.foodName || "Add Food Image"}
                            className="border-2 border-black rounded-md w-24 h-24 md:w-32 md:h-32 object-cover cursor-pointer"
                            onClick={() => document.getElementById('imageUpload').click()}
                        />
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-green-500 block mb-1 text-lg font-medium mr-2">Name&nbsp;:</label>
                        <input
                            type="text"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            className="w-full border-2 border-red-500 text-black p-1 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-green-500 block mb-1 text-lg font-medium mr-2">Quantity&nbsp;:</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full border-2 border-red-500 text-black p-1 rounded"
                        />
                        <select
                            value={quantityType}  // State variable to track selected unit
                            onChange={(e) => setQuantityType(e.target.value)} // Update unit when user selects an option
                            className="ml-4 border-2 border-red-500 text-black p-1 rounded"
                        >
                            <option value="unit">unit</option>
                            <option value="gms">gms</option>
                            <option value="ml">ml</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-green-500 block mb-1 text-lg font-medium mr-4 w-16">Protein&nbsp;:</label>
                        <input
                            type="number"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            className="w-full border-2 border-red-500 text-black p-1 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-green-500 block mb-1 text-lg font-medium mr-4 w-16">Carbs&nbsp;:</label>
                        <input
                            type="number"
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                            className="w-full border-2 border-red-500 text-black p-1 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-green-500 block mb-1 text-lg font-medium mr-4 w-16">Fats&nbsp;:</label>
                        <input
                            type="number"
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                            className="w-full border-2 border-red-500 text-black p-1 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-green-500 block mb-1 text-lg font-medium mr-4 w-16">Calories&nbsp;:</label>
                        <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="w-full border-2 border-red-500 text-black p-1 rounded"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-4 mt-6">
                    <button
                        className="px-4 py-2 bg-blue-300 text-black border-2 border-black rounded"
                        onClick={handleGetMacrosData}
                        disabled={fetchedMacros}>
                        Get Macros?
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-black border-2 border-black rounded"
                        onClick={handleSave}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomFoodItemDetailsModal;
