export const Input = ({ placeholder, reference }: { placeholder: string, reference: any }) => {
    return <div>
        <input ref={reference} placeholder={placeholder} type="text" className="w-full m-1 px-4 py-2 border rounded-lg" />
    </div>
}