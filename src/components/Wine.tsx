
interface IProps {
    key: string,
    index: string,
    wine: {},
    render : () => {}
}

function Wine(props: IProps): React.ReactNode {
    return (
        props.render()
    );
}

export default Wine;