import './style.scss';
export function XListGroup ({
    tag = 'ul',
    children
}) {
    return <ul className='x-list-group'>{children}</ul>
}