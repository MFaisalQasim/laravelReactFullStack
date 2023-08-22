import { Link } from 'react-router-dom';

export default function TButton({
    color = "indigo",
    to = "",
    circle = false,
    href = "",
    link = false,
    target = "_blank",
    onClick = () => {},
    children,
  }) {
    let classes = [
        "flex",
        "items-center",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "border-2",
        "border-tranparent",
    ];

    if(link){
        classes = [...classes, "transition-color"];

        switch (color) {
            case 'indigo':
                classes = [...classes, "text-indigo-500", "focus:border-indigo-500"];
                break;
            case 'red':
                classes = [...classes, "text-red-500", "focus:border-red-500"];
                break;
        }
    }else{
        classes = [...classes, "text-white", "focus-ring-2", "focus:ring-offset-2"];
        
        switch (color) {
            case 'indigo':
                classes = [...classes, "bg-indigo-600", "hover:bg-indigo-700", "focus:border-indigo-500"];
                break;
            case 'red':
                classes = [...classes, "bg-red-600", "hover:bg-red-700", "focus:border-red-500"];
                break;
            case 'green':
                classes = [...classes, "bg-green-600", "hover:bg-green-700", "focus:border-green-500"];
                break;
        }
    }

    if(circle){
        classes = [...classes, "h-8", "w-8", "item-center", "justify-center", "rounded-full", "text-sm"];
    } else{
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
    }

  return (
    <>
        {href && (
            <a href={href} className={classes.join(" ")} target={target} >{children}</a>
        )}
        {to && (
            <Link to={to} className={classes.join(" ")} >
                {children}
            </Link>
        )}
        {!to && !href && (
            <button onClick={onClick} className={classes.join(" ")} >{children}</button>
        )}
    </>
  )
}
