const Size = ({size}) => {
    return (
        <li>
            <a
                className="inline-flex hover:text-white border border-gray-3 bg-white py-1 px-2 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                href="#"
            >
                {size}
            </a>
        </li>
    )
};
export default Size;