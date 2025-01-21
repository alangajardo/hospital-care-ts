export interface IMenuItemProps {
    handleNavigation: (event: React.FormEvent,view: string) => void,
    view: string,
    activeView: boolean
}