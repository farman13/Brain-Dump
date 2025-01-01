export const Input = ({ placeholder, reference }: { placeholder: string, reference: any }) => {
    return <div>
        <input ref={reference} placeholder={placeholder} type="text" className="px-4 py-3" />
    </div>
}