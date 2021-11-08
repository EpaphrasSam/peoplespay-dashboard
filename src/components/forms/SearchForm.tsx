export default function SearchForm() {
    return (
       <div className="flex items-center justify-center ">
        <div className="flex border-2 border-red-gray-200 bg-gray-200 rounded">
        <input type="text" className="px-4 py-2 w-80 bg-gray-200" placeholder="Search..."/>
        <button className="px-4 text-white bg-red-800 border-l rounded-full">
            Search
        </button>
    </div>
</div>
    )
}