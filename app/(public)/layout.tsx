const PublicLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
        <div className="h-full dark:bg-[#0a0a0a]">
            {children}
        </div>
        </>
    )
}
export default PublicLayout