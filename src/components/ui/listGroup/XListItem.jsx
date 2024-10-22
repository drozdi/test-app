import './style.scss';

export function XListItem ({
    tag = 'li',
    children
}) {
    return <li className='x-list-item'>{children}</li>;
}