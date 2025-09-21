export function InputBox({label , Head,value,onChange}){
    return <div className="grid grid-cols-1">
            
    <label for="helper-text" class="text-sm font-medium text-left py-2">{Head}</label>
    <input type="email" className="w-full px-2 py-1 border rounded border-slate-200" placeholder={label}  
        value={value}               
        onChange={(e) => onChange(e.target.value)} />


        </div>
}