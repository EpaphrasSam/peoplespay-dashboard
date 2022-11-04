type HeaderProp={
    title:string;
}
const PageHeader=({title}:HeaderProp)=><h2 className="text-2xl leading-tight text-red-700 mb-10">{title}</h2>
export default PageHeader;