const Color = ({color}) => {
    return (
        <li>
            {/* <a
                className="inline-flex hover:text-white border border-gray-3 bg-white py-1 px-2 rounded-md ease-out duration-200 hover:bg-blue hover:border-blue"
                href="#"
            >
                {color}
            </a> */}
            <a
                className={`inline-flex border border-gray-3 bg-${color} py-1 px-2 ease-out duration-200 hover:bg-${color}-dark hover:border-${color}-dark rounded-full w-10 h-10`}
                href="#"
            />
        </li>
    )
};
export default Color;