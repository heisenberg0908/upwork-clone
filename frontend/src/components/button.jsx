export const Button=({onClick,placeholder})=>{
    return <div>
        <button onClick={onClick} type="button" class="text-green bg-white hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{placeholder}</button>
    </div>
}