import './stylesheets/section.css'


/**
 * Component that will wrap something in a section.
 * @param props a title and the children to be wrapped. The title will be on top
 * @returns the children wrapped in a div with a 'section' class
 */
export default function Section({ title, type, children }: {title: string, type: 'default' | 'error' | 'loading', children: JSX.Element | JSX.Element[]}) {
    return(
        <div className={"section " + type}>
            <span className="section-title">{title}</span>
            {children}
        </div>
    );
}
