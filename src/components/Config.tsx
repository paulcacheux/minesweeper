import React from "react";
import "../style/Config.css";

interface IBoardConfigProps {
    title: string;
    width: number;
    height: number;
    bombs: number;
}

const ConfigLink: React.FC<IBoardConfigProps> = (props: IBoardConfigProps) => {
    return (
        <a className="btn" href={`?width=${props.width}&height=${props.height}&bombs=${props.bombs}`}>{props.title}</a>
    );
}

const Config: React.FC = () => {
    return (
        <div className="btn-group">
            <ConfigLink title="easy" width={9} height={9} bombs={10} />
            <ConfigLink title="medium" width={16} height={16} bombs={40} />
            <ConfigLink title="hard" width={30} height={16} bombs={99} />
        </div>
    );
}

export default Config;