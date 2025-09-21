export function Button({label,onClick}) {
    return <button onClick={onClick} type="button" class="text-white font-semibold bg-gray-800 hover:bg-gray-900 w-full mt-5 rounded h-9 focus:ring-4 "> {label} </button>
    
}